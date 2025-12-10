// Simple search/retrieval logic for Epicure items
// This uses keyword and tag matching - can be upgraded to embedding-based search

import { EpicureItem, epicureItems } from '@/src/data/epicureItems';

export interface SearchQuery {
  text: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'dessert';
  dietaryNeeds?: {
    glutenFree?: boolean;
    nutFree?: boolean;
  };
  timeConstraint?: 'quick' | 'medium' | 'any';
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
    
    // Check dietary requirements
    if (query.dietaryNeeds?.glutenFree && !item.glutenFree) return { item, score: 0 };
    if (query.dietaryNeeds?.nutFree && !item.nutFree) return { item, score: 0 };
    
    // Check meal type
    if (query.mealType) {
      const mealTypeMap: Record<string, string[]> = {
        breakfast: ['breakfast'],
        lunch: ['lunch', 'dinner'], // Lunch items might be in dinner category
        dinner: ['dinner'],
        dessert: ['dessert'],
      };
      const relevantTags = mealTypeMap[query.mealType] || [];
      if (!relevantTags.some(tag => item.tags.includes(tag))) {
        score -= 10; // Penalize but don't exclude
      }
    }
    
    // Time constraint
    if (query.timeConstraint === 'quick') {
      const quickTime = item.timeToMake?.includes('20') || 
                       item.timeToMake?.includes('15') ||
                       item.timeToMake?.includes('5 minutes');
      if (quickTime) score += 5;
      else if (item.timeToMake) score -= 3;
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
  if (lower.includes('quick') || lower.includes('fast') || lower.includes('20 minute') || 
      lower.includes('15 minute') || lower.includes('minute')) {
    return 'quick';
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
  };
}


