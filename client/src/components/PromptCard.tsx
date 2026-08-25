import { Bookmark, ArrowUpRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PromptRecord, accentMap, formatPrice } from '@/data/catalog';

export default function PromptCard({ prompt, index = 0 }: { prompt: PromptRecord; index?: number }) {
  const accent = accentMap[prompt.accent];

  return (
    <article
      className="prompt-surface group relative flex min-h-[300px] flex-col overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Gradient top strip */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{
          background: prompt.accent === 'violet' ? 'linear-gradient(90deg, #7c3aed, #a78bfa)'
            : prompt.accent === 'cyan' ? 'linear-gradient(90deg, #06b6d4, #67e8f9)'
            : prompt.accent === 'emerald' ? 'linear-gradient(90deg, #10b981, #34d399)'
            : prompt.accent === 'rose' ? 'linear-gradient(90deg, #f43f5e, #fb7185)'
            : 'linear-gradient(90deg, #f59e0b, #fbbf24)',
        }}
      />

      <div className="flex flex-1 flex-col p-5">
        {/* Header row */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {prompt.isFeatured && (
              <span className="badge-accent">
                <Star className="h-3 w-3" /> Featured
              </span>
            )}
            {prompt.isTrending && (
              <span className="badge-accent">🔥 Trending</span>
            )}
            {prompt.isNew && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-success/20 bg-success/10 px-2.5 py-1 text-[0.68rem] font-semibold text-success-400">
                New
              </span>
            )}
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-surface-700 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] hover:text-accent-300"
            aria-label={`Save ${prompt.title}`}
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="badge">{prompt.category}</span>
          <span className="badge">{prompt.model}</span>
        </div>

        {/* Title */}
        <h3 className="display max-w-[18rem] text-xl leading-tight transition-colors duration-200 group-hover:text-accent-300 lg:text-[1.35rem]">
          {prompt.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-surface-700">{prompt.description}</p>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between border-t border-white/[0.05] pt-4">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
              style={{ background: prompt.creatorGradient }}
            >
              {prompt.creatorInitials}
            </span>
            <span className="text-xs font-medium text-surface-700">{prompt.creator}</span>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs font-semibold text-surface-800">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              {prompt.rating}
            </div>
            <span
              className={`text-sm font-bold ${
                prompt.price === 0 ? 'text-success-400' : 'text-white'
              }`}
            >
              {formatPrice(prompt.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Full-card link */}
      <Link to={`/prompts/${prompt.slug}`} className="absolute inset-0" aria-label={`Open ${prompt.title}`}>
        <span className="sr-only">Open prompt</span>
      </Link>

      {/* Hover arrow */}
      <ArrowUpRight className="pointer-events-none absolute right-5 top-8 h-4 w-4 text-accent-300 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </article>
  );
}
