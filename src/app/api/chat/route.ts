import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { searchItems, parseQuery } from '@/src/lib/search';
import { EpicureItem, epicureItems } from '@/src/data/epicureItems';

// Initialize OpenAI client
// IMPORTANT: Set your OpenAI API key in .env.local as OPENAI_API_KEY
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

/**
 * System prompt tuned to Epicure's brand tone:
 * - Warm, encouraging, supportive
 * - Practical, solution-focused
 * - Not sales-pushy
 * - Friendly kitchen coach personality
 * - Emphasizes speed, ease, dietary considerations
 */
const SYSTEM_PROMPT = `You are a friendly kitchen helper for Epicure, a company that makes real, nourishing food for busy people. Your personality is warm, encouraging, and practical—like a supportive friend who helps make dinner easier.

Key brand values:
- REAL NOURISHING FOOD FOR BUSY PEOPLE
- Gluten-Free. Nut-Free. Stress Free. Ready in Minutes.
- Simple, fast, family-friendly meals
- Real ingredients, no filler

Your communication style:
- Use warm, encouraging language ("You've got this", "Let's make dinner easier")
- Be practical and solution-focused
- Give concrete suggestions with specific product/recipe names
- Frequently mention speed, ease, and dietary benefits (gluten-free, nut-free)
- Use simple, clear language—you're a friendly kitchen coach, not a formal nutritionist
- Don't be sales-pushy, but gently suggest relevant mixes/seasonings/collections when appropriate

When recommending items:
- ABSOLUTELY CRITICAL: You can ONLY mention recipes and products that are EXACTLY listed in the "relevant Epicure recipes/products" section below
- NEVER invent, make up, create, or suggest ANY Epicure items that are not in the provided list
- You must use the EXACT item names as they appear in the list - do not modify, abbreviate, or create variations
- If no items are provided, you can give general cooking advice but you MUST NOT mention any specific Epicure product or recipe names
- Always mention specific recipe or product names from the provided list using their exact names
- Include time to make when available
- Highlight dietary benefits (gluten-free, nut-free)
- Give practical tips using the actual items provided with their exact names

VALIDATION: Before responding, verify that every Epicure item name you mention appears exactly in the provided list. If you're unsure, do not mention it.

Important: Always remind users that this is not medical advice and they should check ingredient labels for allergies.

Keep responses concise (2-4 sentences) unless the user asks for more detail.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in .env.local',
          content: "I'm sorry, the chatbot service isn't configured yet. Please check the setup instructions.",
          items: []
        },
        { status: 500 }
      );
    }

    // Search for relevant Epicure items
    const query = parseQuery(message);
    const relevantItems = searchItems(query, 5);

    // Build a complete list of all available items for reference
    const allItemNames = epicureItems.map(item => item.name).join(', ');

    // Build context about retrieved items
    let itemsContext = '';
    if (relevantItems.length > 0) {
      itemsContext = `\n\n=== AVAILABLE EPICURE ITEMS FOR THIS QUERY ===\n`;
      itemsContext += `These are the ONLY Epicure recipes/products you can mention in your response:\n\n`;
      relevantItems.forEach((item, idx) => {
        itemsContext += `${idx + 1}. "${item.name}" (${item.type})\n`;
        itemsContext += `   Description: ${item.description}\n`;
        if (item.timeToMake) itemsContext += `   Time: ${item.timeToMake}\n`;
        if (item.category) itemsContext += `   Category: ${item.category}\n`;
        itemsContext += `\n`;
      });
      itemsContext += `\n=== CRITICAL RULES ===\n`;
      itemsContext += `1. You MUST ONLY mention items from the list above using their EXACT names (e.g., "${relevantItems[0]?.name}")\n`;
      itemsContext += `2. You CANNOT mention any other Epicure products or recipes - only these ${relevantItems.length} items exist for this query\n`;
      itemsContext += `3. If you want to suggest something, you must use one of these exact items and adapt your suggestion\n`;
      itemsContext += `4. Complete list of all available Epicure items in the system: ${allItemNames}\n`;
      itemsContext += `5. If an item is not in the list above, it does NOT exist and you MUST NOT mention it\n`;
    } else {
      itemsContext = `\n\n=== NO ITEMS MATCHED THIS QUERY ===\n`;
      itemsContext += `No specific Epicure items matched this query.\n`;
      itemsContext += `Available Epicure items in the system: ${allItemNames}\n`;
      itemsContext += `\nYou can provide helpful general cooking advice in Epicure's warm, practical tone, but you MUST NOT mention any specific Epicure product or recipe names since none matched the query.\n`;
    }

    // Build conversation history for context
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + itemsContext,
      },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      {
        role: 'user',
        content: message,
      },
    ];

    // Call OpenAI API with lower temperature for more consistent, deterministic responses
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency, can upgrade to gpt-4 if needed
      messages,
      temperature: 0.3, // Lower temperature for more deterministic responses that follow instructions
      max_tokens: 500,
    });

    let assistantMessage = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again.";

    // Post-process validation: Check if response mentions any items not in the provided list
    if (relevantItems.length > 0) {
      const allowedItemNames = relevantItems.map(item => item.name.toLowerCase());
      const allItemNames = epicureItems.map(item => item.name.toLowerCase());
      
      // Check if response mentions any Epicure items that aren't in the allowed list
      const mentionedItems = allItemNames.filter(itemName => 
        assistantMessage.toLowerCase().includes(itemName)
      );
      
      const invalidItems = mentionedItems.filter(itemName => 
        !allowedItemNames.includes(itemName)
      );
      
      // If invalid items are mentioned, add a note (or we could filter them out)
      // For now, we'll just log a warning - in production you might want to filter
      if (invalidItems.length > 0) {
        console.warn('Response mentions items not in allowed list:', invalidItems);
        // Optionally, we could append a correction or filter the response
      }
    }

    // Return response with relevant items
    return NextResponse.json({
      content: assistantMessage,
      items: relevantItems,
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return NextResponse.json(
        { 
          error: 'Invalid OpenAI API key',
          content: "I'm sorry, there's an authentication issue. Please check your OpenAI API key configuration.",
          items: []
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Internal server error',
        content: "I'm sorry, I encountered an error. Please try again.",
        items: []
      },
      { status: 500 }
    );
  }
}


