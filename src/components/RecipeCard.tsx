import { EpicureItem } from '@/src/data/epicureItems';

interface RecipeCardProps {
  item: EpicureItem;
  compact?: boolean;
}

export default function RecipeCard({ item, compact = false }: RecipeCardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-amber-100 bg-[#fefbf7] p-3 shadow-sm hover:border-amber-300 transition-colors',
        compact ? 'text-xs' : 'text-sm',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-amber-700">
            {item.type === 'recipe' ? 'Recipe' : 'Product'}
          </div>
          <h3 className="mt-0.5 text-sm font-semibold text-slate-900">
            {item.name}
          </h3>
        </div>
        {(item.glutenFree || item.nutFree) && (
          <div className="flex flex-col items-end gap-1 text-[10px] text-emerald-700">
            {item.glutenFree && <span>✓ Gluten-Free</span>}
            {item.nutFree && <span>✓ Nut-Free</span>}
          </div>
        )}
      </div>

      {(item.category || item.timeToMake || item.tags) && (
        <div className="mt-1 flex flex-wrap gap-1">
          {item.category && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-amber-100">
              {item.category}
            </span>
          )}
          {item.timeToMake && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-amber-100">
              {item.timeToMake}
            </span>
          )}
          {item.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-amber-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 text-xs text-slate-600 line-clamp-3">{item.description}</p>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center text-[11px] font-semibold text-amber-700 hover:text-amber-800"
      >
        View on Epicure.com
        <span className="ml-1 text-xs">↗</span>
      </a>
    </div>
  );
}

