import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { searchItems, parseQuery } from '@/src/lib/search';
import { EpicureItem } from '@/src/data/epicureItems';

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
- Always mention specific recipe or product names
- Include time to make when available
- Highlight dietary benefits (gluten-free, nut-free)
- Give practical tips (e.g., "Try the Marry Me Chicken mix with chicken breasts and cherry tomatoes for a 20-minute dinner.")

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

    // Build context about retrieved items
    let itemsContext = '';
    if (relevantItems.length > 0) {
      itemsContext = '\n\nHere are some relevant Epicure recipes/products I found:\n';
      relevantItems.forEach((item, idx) => {
        itemsContext += `${idx + 1}. ${item.name} (${item.type}): ${item.description}`;
        if (item.timeToMake) itemsContext += ` Time: ${item.timeToMake}.`;
        if (item.category) itemsContext += ` Category: ${item.category}.`;
        itemsContext += `\n`;
      });
      itemsContext += '\nUse these specific items in your response when relevant.';
    } else {
      itemsContext = '\n\nNo specific Epicure items matched this query, but you can still provide helpful general cooking advice in Epicure\'s warm, practical tone.';
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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency, can upgrade to gpt-4 if needed
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't generate a response. Please try again.";

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


