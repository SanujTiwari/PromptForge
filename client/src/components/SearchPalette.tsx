import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { prompts } from '@/data/catalog';

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  useEffect(() => { if (open) setQuery(''); }, [open]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, [onClose]);

  const results = useMemo(
    () =>
      prompts
        .filter((p) =>
          `${p.title} ${p.category} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6),
    [query]
  );

  if (!open) return null;

  const choose = (slug: string) => { navigate(`/prompts/${slug}`); onClose(); };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search prompts"
      onMouseDown={onClose}
    >
      <div
        className="mx-auto max-w-2xl animate-scale-in rounded-2xl border border-white/10 bg-surface-200 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-white/[0.06] px-5">
          <Search className="mr-3 h-5 w-5 text-accent" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-16 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-surface-600"
            placeholder="Search prompts, categories, models…"
          />
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-700 transition hover:bg-white/[0.06] hover:text-white"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-2">
          {query.length === 0 && (
            <p className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-surface-600">
              Popular prompts
            </p>
          )}
          {results.map((p) => (
            <button
              type="button"
              key={p.slug}
              onClick={() => choose(p.slug)}
              className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-white/[0.04]"
            >
              <span>
                <span className="block text-sm font-semibold text-white">{p.title}</span>
                <span className="mt-0.5 block text-xs text-surface-700">
                  {p.category} · {p.model} · {p.price === 0 ? 'Free' : `₹${p.price}`}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-surface-600" />
            </button>
          ))}
          {results.length === 0 && (
            <p className="p-6 text-center text-sm text-surface-700">No prompts match that search.</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-white/[0.06] px-5 py-3 text-[0.68rem] font-medium text-surface-600">
          <span>Type to search</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
