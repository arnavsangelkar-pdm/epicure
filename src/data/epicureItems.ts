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
    description: 'Fluffy, protein-rich pancakes made with Epicure\'s gluten-free pancake mix.',
    url: 'https://epicure.com/blogs/recipes/protein-powered-pancakes-gluten-free',
    category: 'What\'s for Breakfast',
    timeToMake: '20 minutes',
    dishType: 'Pancakes',
  },
  {
    id: '2',
    name: 'Merry Berry Holiday Pancakes',
    type: 'recipe',
    tags: ['breakfast', 'pancakes', 'holiday', 'berries', 'sweet'],
    glutenFree: true,
    nutFree: true,
    description: 'Festive holiday pancakes made with Pancake & Waffle Mix, topped with fresh fruit and fun seasonal decorations.',
    url: 'https://epicure.com/blogs/recipes/merry-berry-holiday-pancakes',
    category: 'What\'s for Breakfast',
    timeToMake: '25 minutes',
    dishType: 'Pancakes',
  },
  {
    id: '3',
    name: 'Sheet Pan Breakfast Pancakes (Chocolate Option)',
    type: 'recipe',
    tags: ['breakfast', 'pancakes', 'sheet pan', 'easy'],
    glutenFree: true,
    nutFree: true,
    description: 'Large-batch oven-baked pancakes made in a sheet pan for effortless mornings. Add chocolate chips for a chocolate version.',
    url: 'https://epicure.com/blogs/recipes/sheet-pan-breakfast-pancakes',
    category: 'What\'s for Breakfast',
    timeToMake: '30 minutes',
    dishType: 'Sheet pan pancakes',
  },
  
  // Dinner Recipes
  {
    id: '4',
    name: 'Marry Me Chicken',
    type: 'recipe',
    tags: ['dinner', 'chicken', 'quick', 'creamy'],
    glutenFree: true,
    nutFree: true,
    description: 'Creamy, savory chicken simmered with Epicure\'s Marry Me Chicken Seasoning for a fast and indulgent dinner.',
    url: 'https://epicure.com/blogs/recipes/marry-me-chicken',
    category: 'What\'s for Dinner',
    timeToMake: '20 minutes',
    dishType: 'One-pan dinner',
  },
  {
    id: '5',
    name: 'Easy Teriyaki Stir-Fry',
    type: 'recipe',
    tags: ['dinner', 'stir-fry', 'vegetables', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'A fast stir-fry made with Epicure\'s Teriyaki Seasoning and your choice of protein and veggies.',
    url: 'https://epicure.com/blogs/recipes?utm_source=chatgpt.com',
    category: 'What\'s for Dinner',
    timeToMake: '~20-25 minutes',
    dishType: 'Stir Fry',
  },
  {
    id: '6',
    name: 'One-Pan Taco Bake',
    type: 'recipe',
    tags: ['dinner', 'quick', 'family-friendly', 'bake'],
    glutenFree: true,
    nutFree: true,
    description: 'A cheesy, hearty one-pan taco casserole made using Epicure taco seasoning blends.',
    url: 'https://epicure.com/blogs/recipes?utm_source=chatgpt.com',
    category: 'What\'s for Dinner',
    timeToMake: '~25-30 minutes',
    dishType: 'One-pan dinner',
  },
  
  // Dessert Recipes
  {
    id: '7',
    name: 'Chocolate Velvet Cheesecake',
    type: 'recipe',
    tags: ['dessert', 'chocolate', 'cheesecake', 'gluten-free', 'indulgent'],
    glutenFree: true,
    nutFree: true,
    description: 'Silky chocolate cheesecake made using Chocolate Velvet Cheesecake Mix.',
    url: 'https://epicure.com/blogs/recipes/chocolate-velvet-no-bake-cheesecake',
    category: 'Gluten Free Desserts',
    timeToMake: '45-50 minutes + chilling',
    dishType: 'Cheesecake',
  },
  {
    id: '8',
    name: 'Fudgy Gluten-Free Brownies',
    type: 'recipe',
    tags: ['dessert', 'chocolate', 'brownies', 'gluten-free'],
    glutenFree: true,
    nutFree: true,
    description: 'Dark, rich brownies made with Epicure\'s Fudgy Brownie Mix.',
    url: 'https://epicure.com/blogs/recipes/fudgy-gluten-free-brownies',
    category: 'Gluten Free Desserts',
    timeToMake: '30-35 minutes',
    dishType: 'Brownies',
  },
  {
    id: '9',
    name: 'Gingerbread Cookies',
    type: 'recipe',
    tags: ['dessert', 'cookies', 'gingerbread', 'holiday', 'gluten-free'],
    glutenFree: true,
    nutFree: true,
    description: 'Classic cut-out gingerbread cookies using Gingerbread Cookie Mix.',
    url: 'https://epicure.com/blogs/recipes/gluten-free-gingerbread-cookies',
    category: 'Gluten Free Desserts',
    timeToMake: '2-3 hours (includes chilling)',
    dishType: 'Cookies',
  },
  
  // Products
  {
    id: '10',
    name: 'Pancake & Waffle Mix',
    type: 'product',
    tags: ['breakfast', 'pancakes', 'waffles', 'bestseller'],
    glutenFree: true,
    nutFree: true,
    description: 'Epicure\'s bestselling gluten-free pancake & waffle mix made for fluffy, perfect texture every time.',
    url: 'https://epicure.com/products/pancake-waffle',
    category: 'Seasonings & Mixes',
    timeToMake: '5 minutes',
    dishType: 'Breakfast Mix',
  },
  {
    id: '11',
    name: 'Marry Me Chicken Seasoning',
    type: 'product',
    tags: ['dinner', 'chicken', 'creamy', 'bestseller'],
    glutenFree: true,
    nutFree: true,
    description: 'Creamy, tomato-basil style seasoning blend used for Marry Me Chicken.',
    url: 'https://epicure.com/products/marry-me-chicken',
    category: 'Seasonings',
    timeToMake: 'Ready to use',
    dishType: 'Seasoning Blend',
  },
  {
    id: '12',
    name: 'SPG Seasoning (All-Purpose)',
    type: 'product',
    tags: ['seasoning', 'versatile', 'all-purpose'],
    glutenFree: true,
    nutFree: true,
    description: 'Epicure\'s essential salt-pepper-garlic blend for everyday cooking.',
    url: 'https://epicure.com/products/spg-seasoning',
    category: 'Seasonings',
    timeToMake: 'Ready to use',
    dishType: 'Seasoning Blend',
  },
  {
    id: '13',
    name: 'Gingerbread Cookie Mix',
    type: 'product',
    tags: ['dessert', 'gingerbread', 'holiday', 'mix'],
    glutenFree: true,
    nutFree: true,
    description: 'Warm, spiced gingerbread cookie mix perfect for holiday baking.',
    url: 'https://epicure.com/products/gingerbreadcookie',
    category: 'Gluten Free Desserts',
    timeToMake: '5-10 minutes',
    dishType: 'Cookie Mix',
  },
  {
    id: '14',
    name: 'Chocolate Velvet Cheesecake Mix',
    type: 'product',
    tags: ['dessert', 'chocolate', 'cheesecake', 'mix'],
    glutenFree: true,
    nutFree: true,
    description: 'Silky chocolate cheesecake mix—just add cream cheese and yogurt.',
    url: 'https://epicure.com/products/chocolate-velvet-cheesecake',
    category: 'Gluten Free Desserts',
    timeToMake: '10 minutes',
    dishType: 'Cheesecake Mix',
  },
  {
    id: '15',
    name: 'Fudgy Brownie Mix',
    type: 'product',
    tags: ['dessert', 'chocolate', 'brownies', 'quick'],
    glutenFree: true,
    nutFree: true,
    description: 'Epicure\'s ultra-rich brownie mix for fudgy, chocolate-packed brownies.',
    url: 'https://epicure.com/products/fudgy-brownie-mix-pack-of-2',
    category: 'Gluten Free Desserts',
    timeToMake: '5-10 minutes',
    dishType: 'Brownie Mix',
  },
];


