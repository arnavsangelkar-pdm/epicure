// Simple search/retrieval logic for Epicure items
// This uses keyword and tag matching - can be upgraded to embedding-based search

import { EpicureItem, epicureItems } from '@/src/data/epicureItems';

function parseMinutesFromString(value?: string): number | undefined {
  if (!value) return undefined;
  // Handle ranges like "30-35 minutes" - use the first number (lower bound)
  const minuteMatch = value.match(/(\d+)\s*-?\s*minute/i);
  if (minuteMatch) {
    return parseInt(minuteMatch[1], 10);
  }
  // Handle hours like "2-3 hours" - convert to minutes
  const hourMatch = value.match(/(\d+)\s*-?\s*hour/i);
  if (hourMatch) {
    return parseInt(hourMatch[1], 10) * 60; // Convert hours to minutes (use lower bound)
  }
  return undefined;
}

function parseRequestedMinutes(text: string): number | undefined {
  const lower = text.toLowerCase();
  // Match patterns like "20 minute", "20-minute", "20min", "20 min"
  const match = lower.match(/(\d+)\s*-?\s*min(?:ute)?s?/);
  if (!match) return undefined;
  return parseInt(match[1], 10);
}

export interface SearchQuery {
  text: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'dessert';
  dietaryNeeds?: {
    glutenFree?: boolean;
    nutFree?: boolean;
  };
  timeConstraint?: 'quick' | 'medium' | 'any';
  maxMinutes?: number; // NEW
}

/**
 * Simple keyword-based search that matches items based on:
 * - Tags (exact matches)
 * - Name (partial matches)
 * - Description (partial matches)
 * - Dietary requirements
 * - Meal type
 */
export function searchItems(query: SearchQuery, limit: number = 5): EpicureItem[] {
  const searchText = query.text.toLowerCase();
  const words = searchText.split(/\s+/).filter(w => w.length > 2); // Filter out short words
  
  // Score each item
  const scored = epicureItems.map(item => {
    let score = 0;
    
    const itemMinutes = parseMinutesFromString(item.timeToMake);

    // HARD filter when user explicitly requests a time limit
    // Strictly exclude recipes that exceed the requested time (no buffer)
    if (query.maxMinutes !== undefined && itemMinutes !== undefined) {
      if (itemMinutes > query.maxMinutes) {
        return { item, score: 0 };
      }
    }
    
    // Check dietary requirements
    if (query.dietaryNeeds?.glutenFree && !item.glutenFree) return { item, score: 0 };
    if (query.dietaryNeeds?.nutFree && !item.nutFree) return { item, score: 0 };
    
    // STRICT meal type filtering - exclude products that don't match meal type
    if (query.mealType) {
      const mealTypeMap: Record<string, string[]> = {
        breakfast: ['breakfast'],
        lunch: ['lunch', 'dinner'], // Lunch items might be in dinner category
        dinner: ['dinner'],
        dessert: ['dessert'],
      };
      const relevantTags = mealTypeMap[query.mealType] || [];
      const hasRelevantTag = relevantTags.some(tag => item.tags.includes(tag));
      
      // For products: exclude if they don't match the meal type
      if (item.type === 'product' && !hasRelevantTag) {
        return { item, score: 0 };
      }
      
      // For recipes: penalize but don't exclude (recipes might be versatile)
      if (item.type === 'recipe' && !hasRelevantTag) {
        score -= 15; // Stronger penalty
      }
    }
    
    // Extract key food keywords from query (chicken, beef, etc.) and exclude mismatches
    const foodKeywords = ['chicken', 'beef', 'pork', 'fish', 'salmon', 'turkey', 'pasta', 'rice', 'vegetable', 'vegetables'];
    const queryLower = query.text.toLowerCase();
    const mentionedFoods = foodKeywords.filter(keyword => queryLower.includes(keyword));
    
    if (mentionedFoods.length > 0) {
      const itemText = `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
      const hasMatchingFood = mentionedFoods.some(food => itemText.includes(food));
      
      // Exclude items that don't mention the requested food
      if (!hasMatchingFood) {
        return { item, score: 0 };
      }
    }
    
    // Time constraint
    if (query.timeConstraint === 'quick') {
      if (itemMinutes !== undefined && itemMinutes <= 25) {
        score += 8;
      } else if (itemMinutes !== undefined) {
        score -= 5;
      }
    }
    
    // Tag matching (strong signal)
    words.forEach(word => {
      if (item.tags.some(tag => tag.toLowerCase().includes(word))) {
        score += 10;
      }
    });
    
    // Name matching (very strong signal)
    if (item.name.toLowerCase().includes(searchText)) {
      score += 20;
    } else {
      words.forEach(word => {
        if (item.name.toLowerCase().includes(word)) {
          score += 8;
        }
      });
    }
    
    // Description matching
    words.forEach(word => {
      if (item.description.toLowerCase().includes(word)) {
        score += 3;
      }
    });
    
    // Category matching
    if (item.category && searchText.includes(item.category.toLowerCase())) {
      score += 5;
    }
    
    // Boost bestsellers
    if (item.tags.includes('bestseller')) {
      score += 2;
    }
    
    // Prioritize recipes over products when meal type is specified
    if (query.mealType && item.type === 'recipe') {
      score += 5;
    }
    
    // Slight penalty for products when specific meal type is requested
    if (query.mealType && item.type === 'product') {
      score -= 3;
    }
    
    return { item, score };
  });
  
  // Filter out zero scores and sort by score
  const filtered = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
  
  return filtered;
}

/**
 * Extract meal type from user query
 */
export function extractMealType(text: string): 'breakfast' | 'lunch' | 'dinner' | 'dessert' | undefined {
  const lower = text.toLowerCase();
  if (lower.includes('breakfast') || lower.includes('morning') || lower.includes('pancake')) {
    return 'breakfast';
  }
  if (lower.includes('lunch')) {
    return 'lunch';
  }
  if (lower.includes('dinner') || lower.includes('evening') || lower.includes('night')) {
    return 'dinner';
  }
  if (lower.includes('dessert') || lower.includes('sweet') || lower.includes('treat')) {
    return 'dessert';
  }
  return undefined;
}

/**
 * Extract dietary needs from user query
 */
export function extractDietaryNeeds(text: string): { glutenFree?: boolean; nutFree?: boolean } {
  const lower = text.toLowerCase();
  return {
    glutenFree: lower.includes('gluten') && (lower.includes('free') || lower.includes('-free')),
    nutFree: lower.includes('nut') && (lower.includes('free') || lower.includes('-free')),
  };
}

/**
 * Extract time constraint from user query
 */
export function extractTimeConstraint(text: string): 'quick' | 'medium' | 'any' {
  const lower = text.toLowerCase();

  if (lower.includes('quick') || lower.includes('fast')) return 'quick';

  const minutes = parseRequestedMinutes(lower);
  if (minutes !== undefined) {
    if (minutes <= 25) return 'quick';
    if (minutes <= 45) return 'medium';
  }

  return 'any';
}

/**
 * Parse user query into structured search query
 */
export function parseQuery(text: string): SearchQuery {
  return {
    text,
    mealType: extractMealType(text),
    dietaryNeeds: extractDietaryNeeds(text),
    timeConstraint: extractTimeConstraint(text),
    maxMinutes: parseRequestedMinutes(text), // NEW
  };
}


