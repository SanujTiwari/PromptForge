import { Bookmark, ArrowUpRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PromptRecord, formatPrice } from '@/data/catalog';

const accentClasses = {
  forge: 'bg-forge-500 text-white',
  moss: 'bg-moss-500 text-white',
  ink: 'bg-ink-800 text-paper-50',
};

export default function PromptCard({ prompt, index = 0 }: { prompt: PromptRecord; index?: number }) {
  return (
    <article className="prompt-surface group relative flex min-h-[255px] flex-col p-5" style={{ animationDelay: `${index * 55}ms` }}>
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className={`grid h-9 w-9 place-items-center text-xs font-bold ${accentClasses[prompt.accent]}`}>{String(index + 1).padStart(2, '0')}</span>
        <button type="button" className="grid h-8 w-8 place-items-center border border-transparent text-ink-300 transition hover:border-paper-300 hover:text-forge-600" aria-label={`Save ${prompt.title}`}>
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <span className="catalog-label">{prompt.category}</span>
        <span className="catalog-label">{prompt.model}</span>
      </div>
      <h3 className="display max-w-[17rem] text-[1.65rem] leading-[1.02] group-hover:text-forge-600">{prompt.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-500">{prompt.description}</p>
      <div className="mt-auto flex items-end justify-between border-t border-paper-200 pt-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-paper-200 text-[0.62rem] font-bold text-ink-700">{prompt.creatorInitials}</span>
          <span className="text-xs font-semibold text-ink-500">{prompt.creator}</span>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-xs font-bold text-ink-700"><Star className="h-3.5 w-3.5 fill-forge-500 text-forge-500" />{prompt.rating}</div>
          <span className={prompt.price === 0 ? 'text-sm font-bold text-moss-700' : 'text-sm font-bold text-ink-900'}>{formatPrice(prompt.price)}</span>
        </div>
      </div>
      <Link to={`/prompts/${prompt.slug}`} className="absolute inset-0" aria-label={`Open ${prompt.title}`}><span className="sr-only">Open prompt</span></Link>
      <ArrowUpRight className="pointer-events-none absolute right-5 top-5 h-4 w-4 opacity-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
    </article>
  );
}
