import { EpicureItem } from '@/src/data/epicureItems';
import { epicureItems } from '@/src/data/epicureItems';
import RecipeCard from './RecipeCard';

interface RecommendationSidebarProps {
  items: EpicureItem[];
}

export default function RecommendationSidebar({ items }: RecommendationSidebarProps) {
  // Use provided items if available, otherwise show featured items
  const displayItems = items.length > 0 ? items : epicureItems.slice(0, 5);

  return (
    <aside className="hidden lg:block">
      <div className="h-[70vh] overflow-y-auto rounded-2xl bg-white p-4 shadow-sm border border-amber-50">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900">
          Suggested Recipes & Products
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Quick, gluten-free, nut-free ideas to make dinner easier.
        </p>

        <div className="mt-3 space-y-3">
          {displayItems.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
}

