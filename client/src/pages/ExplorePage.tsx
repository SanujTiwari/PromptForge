import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PromptCard from '@/components/PromptCard';
import { categories, prompts } from '@/data/catalog';

const models = ['All', 'GPT-4o', 'Claude 3.5', 'Midjourney', 'Gemini'];
const sortOptions = [
  { label: 'Most relevant', value: 'relevant' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top rated', value: 'rating' },
];

export default function ExplorePage() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const initialCategory = params.get('category') ?? 'All';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [model, setModel] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState('relevant');

  const filtered = useMemo(() => {
    let result = prompts.filter((p) => {
      const matchesQuery = `${p.title} ${p.description} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesModel = model === 'All' || p.model === model;
      const matchesFree = !freeOnly || p.price === 0;
      return matchesQuery && matchesCategory && matchesModel && matchesFree;
    });

    if (sort === 'newest') result = [...result].reverse();
    else if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, freeOnly, model, query, sort]);

  const chooseCategory = (value: string) => {
    setCategory(value);
    setParams((current) => {
      if (value === 'All') current.delete('category'); else current.set('category', value);
      if (query) current.set('q', query); else current.delete('q');
      return current;
    });
  };

  const onQuery = (value: string) => {
    setQuery(value);
    setParams((current) => {
      if (value) current.set('q', value); else current.delete('q');
      return current;
    });
  };

  const clearAll = () => {
    setQuery(''); setCategory('All'); setModel('All'); setFreeOnly(false); setSort('relevant'); setParams({});
  };

  const hasFilters = query || category !== 'All' || model !== 'All' || freeOnly;

  return (
    <div className="page-shell py-10 sm:py-14">
      {/* Header */}
      <p className="eyebrow">The catalog</p>
      <h1 className="display mt-2 text-4xl sm:text-5xl">Browse the forge</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-surface-700">
        Prompts worth returning to, sorted by the kind of work they help you do.
      </p>

      {/* Layout */}
      <div className="mt-9 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-card-static p-5">
            {/* Category filter */}
            <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-surface-700">
              <Filter className="h-3.5 w-3.5" /> Categories
            </div>
            <div className="space-y-1">
              {['All', ...categories.map((c) => c.name)].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => chooseCategory(item)}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                    category === item
                      ? 'bg-accent/10 text-accent-300'
                      : 'text-surface-700 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Model filter */}
            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-surface-700">AI Model</p>
              <div className="flex flex-wrap gap-1.5">
                {models.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      model === m
                        ? 'bg-accent/10 text-accent-300 border border-accent/20'
                        : 'border border-white/10 text-surface-700 hover:border-accent/20 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Free toggle */}
            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-surface-800">
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-white/5 accent-accent"
                />
                Free to use
              </label>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <section>
          {/* Search + Sort bar */}
          <div className="flex flex-col gap-3 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block max-w-lg flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                className="glass-input !pl-11"
                placeholder="Search the catalog"
              />
            </label>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-surface-700" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-surface-800 outline-none transition hover:border-accent/20"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results meta */}
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-surface-700">
              <strong className="font-bold text-white">{filtered.length}</strong> prompts found
            </p>
            {hasFilters && (
              <button type="button" onClick={clearAll} className="button-link text-xs">
                Clear filters <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((prompt, index) => (
              <PromptCard key={prompt.slug} prompt={prompt} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="glass-card-static p-12 text-center">
              <p className="display text-2xl sm:text-3xl">Nothing on this shelf yet</p>
              <p className="mt-3 text-sm text-surface-700">
                Try a different word or clear a filter to continue browsing.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
