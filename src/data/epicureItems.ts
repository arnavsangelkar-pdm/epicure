// Epicure Recipe & Product Data
// This file contains a sample dataset of recipes and products from epicure.com
// You can expand this by adding more items following the same structure

export interface EpicureItem {
  id: string;
  name: string;
  type: 'recipe' | 'product';
  tags: string[];
  glutenFree: boolean;
  nutFree: boolean;
  description: string;
  url: string;
  category?: string;
  timeToMake?: string;
  dishType?: string;
}

export const epicureItems: EpicureItem[] = [
  // Breakfast Recipes
  {
    id: '1',
    name: 'Protein Powered Pancakes',
    type: 'recipe',
    tags: ['breakfast', 'pancakes', 'protein', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'Fluffy, protein-rich pancakes that keep you satisfied all morning. Made with our Pancake & Waffle mix.',
    url: 'https://epicure.com/recipes/protein-powered-pancakes',
    category: 'What\'s for Breakfast',
    timeToMake: '15 minutes',
    dishType: 'Pancakes',
  },
  {
    id: '2',
    name: 'Merry Berry Holiday Pancakes',
    type: 'recipe',
    tags: ['breakfast', 'pancakes', 'holiday', 'berries', 'sweet'],
    glutenFree: true,
    nutFree: true,
    description: 'Festive pancakes loaded with berries and holiday cheer. Perfect for special mornings.',
    url: 'https://epicure.com/recipes/merry-berry-holiday-pancakes',
    category: 'What\'s for Breakfast',
    timeToMake: '20 minutes',
    dishType: 'Pancakes',
  },
  {
    id: '3',
    name: 'Chocolate Sheet Pan Pancakes',
    type: 'recipe',
    tags: ['breakfast', 'pancakes', 'chocolate', 'sheet pan', 'easy'],
    glutenFree: true,
    nutFree: true,
    description: 'Bake a whole batch of chocolate pancakes on one sheet pan. Perfect for feeding a crowd quickly.',
    url: 'https://epicure.com/recipes/chocolate-sheet-pan-pancakes',
    category: 'What\'s for Breakfast',
    timeToMake: '25 minutes',
    dishType: 'Sheet pan pancakes',
  },
  
  // Dinner Recipes
  {
    id: '4',
    name: 'Marry Me Chicken',
    type: 'recipe',
    tags: ['dinner', 'chicken', 'quick', 'romantic', 'one-pan'],
    glutenFree: true,
    nutFree: true,
    description: 'Tender chicken in a creamy, flavorful sauce that\'s so good, they\'ll want to marry you. Ready in 20 minutes.',
    url: 'https://epicure.com/recipes/marry-me-chicken',
    category: 'What\'s for Dinner',
    timeToMake: '20 minutes',
    dishType: 'One-pan dinner',
  },
  {
    id: '5',
    name: 'Sheet Pan Chicken & Broccoli',
    type: 'recipe',
    tags: ['dinner', 'chicken', 'broccoli', 'sheet pan', 'easy', 'healthy'],
    glutenFree: true,
    nutFree: true,
    description: 'Everything cooks together on one pan for minimal cleanup. Perfect weeknight dinner.',
    url: 'https://epicure.com/recipes/sheet-pan-chicken-broccoli',
    category: 'What\'s for Dinner',
    timeToMake: '30 minutes',
    dishType: 'Sheet pan dinner',
  },
  {
    id: '6',
    name: '20-Minute Chicken Stir Fry',
    type: 'recipe',
    tags: ['dinner', 'chicken', 'quick', 'stir-fry', 'vegetables'],
    glutenFree: true,
    nutFree: true,
    description: 'Fast, flavorful stir fry that comes together in minutes. Great for busy weeknights.',
    url: 'https://epicure.com/recipes/20-minute-chicken-stir-fry',
    category: 'What\'s for Dinner',
    timeToMake: '20 minutes',
    dishType: 'Stir fry',
  },
  
  // Dessert Recipes
  {
    id: '7',
    name: 'Chocolate Velvet Cheesecake',
    type: 'recipe',
    tags: ['dessert', 'chocolate', 'cheesecake', 'gluten-free', 'indulgent'],
    glutenFree: true,
    nutFree: true,
    description: 'Rich, creamy chocolate cheesecake with a velvety texture. No one will believe it\'s gluten-free.',
    url: 'https://epicure.com/recipes/chocolate-velvet-cheesecake',
    category: 'Gluten Free Desserts',
    timeToMake: '45 minutes + chill',
    dishType: 'Cheesecake',
  },
  {
    id: '8',
    name: 'Fudgy Brownies',
    type: 'recipe',
    tags: ['dessert', 'chocolate', 'brownies', 'gluten-free', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'Dense, fudgy brownies that are gluten-free and nut-free. Perfect for satisfying chocolate cravings.',
    url: 'https://epicure.com/recipes/fudgy-brownies',
    category: 'Gluten Free Desserts',
    timeToMake: '35 minutes',
    dishType: 'Brownies',
  },
  {
    id: '9',
    name: 'Gingerbread Cookies',
    type: 'recipe',
    tags: ['dessert', 'cookies', 'gingerbread', 'holiday', 'gluten-free'],
    glutenFree: true,
    nutFree: true,
    description: 'Classic gingerbread cookies that are soft, spicy, and completely gluten-free. Perfect for the holidays.',
    url: 'https://epicure.com/recipes/gingerbread-cookies',
    category: 'Gluten Free Desserts',
    timeToMake: '30 minutes + chill',
    dishType: 'Cookies',
  },
  
  // Products
  {
    id: '10',
    name: 'Pancake & Waffle Mix',
    type: 'product',
    tags: ['breakfast', 'pancakes', 'waffles', 'mix', 'bestseller'],
    glutenFree: true,
    nutFree: true,
    description: 'Our most popular mix! Make fluffy pancakes or crispy waffles in minutes. Just add water and cook.',
    url: 'https://epicure.com/products/pancake-waffle-mix',
    category: 'Seasonings & Mixes',
    timeToMake: '5 minutes prep',
    dishType: 'Breakfast mix',
  },
  {
    id: '11',
    name: 'Marry Me Chicken Seasoning',
    type: 'product',
    tags: ['dinner', 'chicken', 'seasoning', 'bestseller', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'The secret blend that makes Marry Me Chicken so irresistible. Just add to chicken and cream.',
    url: 'https://epicure.com/products/marry-me-chicken-seasoning',
    category: 'Seasonings',
    timeToMake: 'Ready to use',
    dishType: 'Seasoning blend',
  },
  {
    id: '12',
    name: 'Gingerbread Cookie Mix',
    type: 'product',
    tags: ['dessert', 'cookies', 'gingerbread', 'holiday', 'mix'],
    glutenFree: true,
    nutFree: true,
    description: 'Everything you need for perfect gingerbread cookies. Just add butter and egg.',
    url: 'https://epicure.com/products/gingerbread-cookie-mix',
    category: 'Gluten Free Desserts',
    timeToMake: '5 minutes prep',
    dishType: 'Cookie mix',
  },
  {
    id: '13',
    name: 'Chocolate Velvet Cheesecake Mix',
    type: 'product',
    tags: ['dessert', 'chocolate', 'cheesecake', 'mix', 'indulgent'],
    glutenFree: true,
    nutFree: true,
    description: 'Create a restaurant-quality chocolate cheesecake at home. Just add cream cheese and bake.',
    url: 'https://epicure.com/products/chocolate-velvet-cheesecake-mix',
    category: 'Gluten Free Desserts',
    timeToMake: '10 minutes prep',
    dishType: 'Cheesecake mix',
  },
  {
    id: '14',
    name: 'Fudgy Brownie Mix',
    type: 'product',
    tags: ['dessert', 'chocolate', 'brownies', 'mix', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'Rich, fudgy brownies from a mix. Just add oil, water, and egg. Ready in under an hour.',
    url: 'https://epicure.com/products/fudgy-brownie-mix',
    category: 'Gluten Free Desserts',
    timeToMake: '5 minutes prep',
    dishType: 'Brownie mix',
  },
  {
    id: '15',
    name: 'All-Purpose Seasoning',
    type: 'product',
    tags: ['seasoning', 'versatile', 'dinner', 'chicken', 'vegetables'],
    glutenFree: true,
    nutFree: true,
    description: 'A versatile blend that works on everything from chicken to roasted vegetables. Your kitchen staple.',
    url: 'https://epicure.com/products/all-purpose-seasoning',
    category: 'Seasonings',
    timeToMake: 'Ready to use',
    dishType: 'Seasoning blend',
  },
];


