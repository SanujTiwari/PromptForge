import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, prompts } from '@/data/catalog';

const gradientMap: Record<string, string> = {
  Writing: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
  Development: 'linear-gradient(135deg, #06b6d4, #67e8f9)',
  Marketing: 'linear-gradient(135deg, #f43f5e, #fb7185)',
  Research: 'linear-gradient(135deg, #10b981, #34d399)',
  'Visual work': 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  Career: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
  'Data & Analytics': 'linear-gradient(135deg, #f43f5e, #f59e0b)',
  Education: 'linear-gradient(135deg, #10b981, #06b6d4)',
};

export default function CollectionsPage() {
  return (
    <div className="page-shell py-12 sm:py-16">
      <p className="eyebrow">Organized for return visits</p>
      <h1 className="display mt-3 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
        Collections for the work{' '}
        <span className="gradient-text">you want to do well</span>
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-surface-700">
        Browse prompts organized by discipline. Each collection is curated for practitioners who take their craft seriously.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const representative = prompts.find((p) => p.category === category.name);
          return (
            <Link
              key={category.name}
              to={`/explore?category=${encodeURIComponent(category.name)}`}
              className="glass-card group flex min-h-[240px] flex-col overflow-hidden"
            >
              {/* Gradient strip */}
              <div className="h-1.5 w-full shrink-0" style={{ background: gradientMap[category.name] || gradientMap.Writing }} />

              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{category.icon}</span>
                  <ArrowRight className="h-4 w-4 text-surface-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-300" />
                </div>

                <h2 className="display mt-5 text-2xl">{category.name}</h2>
                <p className="mt-2 text-sm leading-6 text-surface-700">{category.note}</p>

                <div className="mt-auto pt-5">
                  <span className="text-xs font-semibold text-accent-300">{category.count} prompts</span>
                  {representative && (
                    <p className="mt-1 truncate text-xs text-surface-600">
                      e.g. {representative.title}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
