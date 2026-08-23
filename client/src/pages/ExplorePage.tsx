import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PromptCard from '@/components/PromptCard';
import { categories, prompts } from '@/data/catalog';

export default function ExplorePage() {
  const [params, setParams] = useSearchParams();
  const initialQuery = params.get('q') ?? '';
  const initialCategory = params.get('category') ?? 'All';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [freeOnly, setFreeOnly] = useState(false);
  const filtered = useMemo(() => prompts.filter((prompt) => {
    const matchesQuery = `${prompt.title} ${prompt.description} ${prompt.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === 'All' || prompt.category === category) && (!freeOnly || prompt.price === 0);
  }), [category, freeOnly, query]);
  const chooseCategory = (value: string) => { setCategory(value); setParams((current) => { if (value === 'All') current.delete('category'); else current.set('category', value); if (query) current.set('q', query); else current.delete('q'); return current; }); };
  const onQuery = (value: string) => { setQuery(value); setParams((current) => { if (value) current.set('q', value); else current.delete('q'); return current; }); };
  return <div className="page-shell py-10 sm:py-14">
    <p className="eyebrow">The catalog</p><h1 className="display mt-2 text-5xl">Browse the forge.</h1><p className="mt-4 max-w-2xl text-base leading-7 text-ink-500">Prompts worth returning to, sorted by the kind of work they help you do.</p>
    <div className="mt-9 grid gap-8 lg:grid-cols-[230px_1fr]">
      <aside className="lg:border-r lg:border-paper-300 lg:pr-7"><div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-ink-500"><Filter className="h-3.5 w-3.5" /> Refine</div><div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible">{['All', ...categories.map((item) => item.name)].map((item) => <button type="button" key={item} onClick={() => chooseCategory(item)} className={`whitespace-nowrap px-3 py-2 text-left text-sm font-semibold transition lg:block lg:w-full ${category === item ? 'bg-ink-800 text-paper-50' : 'text-ink-500 hover:bg-paper-100 hover:text-ink-800'}`}>{item}</button>)}</div><label className="mt-8 flex cursor-pointer items-center gap-3 border-t border-paper-300 pt-5 text-sm font-bold text-ink-700"><input type="checkbox" checked={freeOnly} onChange={(event) => setFreeOnly(event.target.checked)} className="h-4 w-4 accent-forge-600" /> Free to use</label></aside>
      <section><div className="flex flex-col gap-3 border-b border-paper-300 pb-5 sm:flex-row sm:items-center sm:justify-between"><label className="relative block max-w-lg flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-forge-600" /><input value={query} onChange={(event) => onQuery(event.target.value)} className="paper-input pl-10" placeholder="Search the catalog" /></label><button className="inline-flex items-center gap-2 px-2 py-2 text-sm font-bold text-ink-500"><SlidersHorizontal className="h-4 w-4" /> Most relevant</button></div><div className="flex items-center justify-between py-4"><p className="text-sm text-ink-500"><strong className="font-bold text-ink-800">{filtered.length}</strong> selections found</p>{(query || category !== 'All' || freeOnly) && <button type="button" onClick={() => { setQuery(''); setCategory('All'); setFreeOnly(false); setParams({}); }} className="button-text text-xs">Clear filters <X className="h-3.5 w-3.5" /></button>}</div><div className="grid gap-px border border-paper-300 bg-paper-300 md:grid-cols-2">{filtered.map((prompt, index) => <PromptCard key={prompt.slug} prompt={prompt} index={index} />)}</div>{filtered.length === 0 && <div className="border border-paper-300 bg-paper-100 px-6 py-16 text-center"><p className="display text-3xl">Nothing on this shelf yet.</p><p className="mt-3 text-sm text-ink-500">Try a different word or clear a filter to continue browsing.</p></div>}</section>
    </div>
  </div>;
}
