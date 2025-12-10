# Epicure Recipe & Product Chatbot Demo

A self-contained demo web app with a chatbot for Epicure (epicure.com) that answers questions about recipes and products, recommends items, and speaks in Epicure's warm, encouraging brand tone.

## Features

- 🤖 **Intelligent Chatbot**: Answers questions about recipes and products using OpenAI GPT
- 🔍 **Smart Search**: Keyword and tag-based retrieval of recipes/products
- 🎨 **Brand-Inspired UI**: Clean, modern design matching Epicure's aesthetic
- 📱 **Recipe/Product Cards**: Beautiful cards showing recommendations with links
- ⚡ **Fast & Responsive**: Built with Next.js 14 and React

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **OpenAI API** for chat completions
- **Simple keyword search** for recipe/product retrieval

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or navigate to this directory**
   ```bash
   cd Epicure
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
Epicure/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # API route for chat completions
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Main page component
│   ├── components/
│   │   ├── Chat.tsx                  # Chat UI component
│   │   └── RecipeCard.tsx            # Recipe/Product card component
│   ├── data/
│   │   └── epicureItems.ts           # Sample recipes/products dataset
│   └── lib/
│       └── search.ts                 # Search/retrieval logic
├── .env.example                      # Environment variables template
├── package.json
├── tailwind.config.js                # Tailwind configuration
└── README.md
```

## Configuration

### OpenAI API Key

The chatbot uses OpenAI's GPT-4o-mini model (cost-efficient). To configure:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```

**Note**: The API route will return an error if the key is not set. You can upgrade to `gpt-4` in `src/app/api/chat/route.ts` if desired.

### Adding/Editing Epicure Items

To add more recipes or products, edit `src/data/epicureItems.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Recipe or Product Name',
  type: 'recipe' | 'product',
  tags: ['breakfast', 'quick', 'chicken'], // Searchable tags
  glutenFree: true,
  nutFree: true,
  description: 'A short description...',
  url: 'https://epicure.com/...',
  category: 'What\'s for Dinner', // Optional
  timeToMake: '20 minutes', // Optional
  dishType: 'One-pan dinner', // Optional
}
```

The search logic in `src/lib/search.ts` will automatically index these items based on:
- Tags (exact matches)
- Name (partial matches)
- Description (partial matches)
- Dietary requirements
- Meal type (breakfast/lunch/dinner/dessert)
- Time constraints

## System Prompt

The chatbot uses a carefully tuned system prompt to match Epicure's brand tone. You can find and modify it in `src/app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are a friendly kitchen helper for Epicure...
```

Key characteristics:
- Warm, encouraging, supportive
- Practical, solution-focused
- Not sales-pushy
- Friendly kitchen coach personality
- Emphasizes speed, ease, dietary benefits

## How It Works

1. **User sends a message** → Parsed for meal type, dietary needs, time constraints
2. **Search runs** → Finds relevant recipes/products from the dataset
3. **OpenAI API called** → Generates response using system prompt + retrieved items
4. **Response displayed** → Shows text + recommended items as cards

## Example Queries

Try these in the chatbot:

- "I need a 20-minute dinner for 4"
- "Show me gluten-free desserts with chocolate"
- "What can I make with chicken and broccoli?"
- "Recommend 3 Epicure products to try if I'm new"
- "What can I make with the Pancake & Waffle mix?"

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the Epicure color palette:

```javascript
colors: {
  epicure: {
    green: '#6B8E5A',
    // ... other colors
  },
}
```

### Upgrading to Embedding-Based Search

Currently using keyword search. To upgrade to semantic search:

1. Install `@langchain/openai` or similar
2. Generate embeddings for all items
3. Use vector similarity search in `src/lib/search.ts`

### Changing the Model

In `src/app/api/chat/route.ts`, change:

```typescript
model: 'gpt-4o-mini', // Change to 'gpt-4' or 'gpt-3.5-turbo'
```

## Troubleshooting

### "OpenAI API key not configured"

- Make sure `.env.local` exists in the root directory
- Verify the key starts with `sk-`
- Restart the dev server after adding the key

### No items showing in responses

- Check that items in `epicureItems.ts` have matching tags
- Try more specific queries
- Review the search logic in `src/lib/search.ts`

### Build errors

- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version (needs 18+)

## Production Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Set environment variables** on your hosting platform (Vercel, Netlify, etc.)

3. **Deploy**
   - Vercel: `vercel deploy`
   - Or follow your platform's Next.js deployment guide

## License

This is a demo project. Epicure™ is a trademark of Epicure.

## Notes

- This is a demo with a small sample dataset (15 items)
- In production, you'd want a larger dataset and more robust search
- Always remind users to check ingredient labels for allergies
- Not medical advice


