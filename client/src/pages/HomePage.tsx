import { ArrowRight, Command, Search, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PromptCard from '@/components/PromptCard';
import { categories, prompts } from '@/data/catalog';
import { useState } from 'react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/explore${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  };
  return (
    <div>
      <section className="border-b border-paper-300">
        <div className="page-shell grid overflow-hidden lg:grid-cols-[1.12fr_.88fr]">
          <div className="py-16 lg:py-24 lg:pr-12">
            <p className="eyebrow mb-6">A working library for AI</p>
            <h1 className="display max-w-3xl text-5xl leading-[.91] sm:text-6xl lg:text-7xl">Find the words that <em className="text-forge-600">move</em> work forward.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-ink-500 sm:text-lg">PromptForge is a deliberate marketplace for prompts that have been tested, annotated, and made to be used again.</p>
            <form onSubmit={submitSearch} className="mt-9 flex max-w-xl border border-ink-700 bg-white p-1.5 shadow-paper">
              <Search className="ml-3 h-5 w-5 self-center text-forge-600" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-300" placeholder="Search writing, code, research…" aria-label="Search prompts" />
              <button className="button-primary px-4" type="submit">Search <ArrowRight className="h-4 w-4" /></button>
            </form>
            <div className="mt-4 flex items-center gap-2 text-xs text-ink-300"><Command className="h-3.5 w-3.5" />Press <strong className="font-bold text-ink-500">Ctrl K</strong> to open the catalog</div>
          </div>
          <div className="relative hidden border-l border-paper-300 bg-paper-100 p-8 lg:block">
            <div className="absolute left-0 top-[24%] h-px w-full bg-paper-300" />
            <div className="absolute left-0 top-[68%] h-px w-full bg-paper-300" />
            <div className="relative mt-4 max-w-sm border border-ink-800 bg-paper-50 p-5 shadow-lift">
              <div className="flex items-center justify-between"><span className="catalog-label">Editor's note 04</span><Sparkles className="h-4 w-4 text-forge-600" /></div>
              <p className="display mt-9 text-4xl leading-none">The good prompt is a tool, not a trick.</p>
              <p className="mt-5 border-l-2 border-forge-500 pl-3 text-sm leading-6 text-ink-500">Every listing carries the context, constraints, and intended outcome that make it reliable.</p>
              <div className="mt-7 flex items-center justify-between text-xs font-bold uppercase tracking-[.12em] text-ink-500"><span>Made to keep</span><span>— PF</span></div>
            </div>
            <div className="absolute bottom-12 right-8 w-48 border border-paper-300 bg-white p-4"><p className="text-[.64rem] font-bold uppercase tracking-[.15em] text-ink-300">This week</p><p className="display mt-2 text-3xl">42 new tools</p><p className="mt-2 text-xs leading-5 text-ink-500">chosen for clarity and repeatable use</p></div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">The front shelf</p><h2 className="display mt-2 text-4xl">Useful right now.</h2></div><Link className="button-text shrink-0" to="/explore">Browse all <ArrowRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-px border border-paper-300 bg-paper-300 md:grid-cols-3">{prompts.slice(0, 3).map((prompt, index) => <PromptCard key={prompt.slug} prompt={prompt} index={index} />)}</div>
      </section>

      <section className="border-y border-paper-300 bg-paper-100"><div className="page-shell py-16 sm:py-20"><div className="grid gap-10 lg:grid-cols-[.9fr_2.1fr]"><div><p className="eyebrow">Browse by discipline</p><h2 className="display mt-2 text-4xl leading-none">A shelf for every kind of thinking.</h2></div><div className="grid border-t border-paper-300 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category, index) => <Link key={category.name} to={`/explore?category=${encodeURIComponent(category.name)}`} className="group border-b border-paper-300 py-4 sm:px-4 lg:px-5"><div className="flex items-center justify-between"><span className="text-xs font-bold text-ink-300">0{index + 1}</span><span className="text-xs font-bold text-forge-600 opacity-0 transition group-hover:opacity-100">View →</span></div><p className="mt-5 font-bold text-ink-800">{category.name}</p><p className="mt-1 text-xs leading-5 text-ink-500">{category.note}</p><p className="mt-4 text-xs font-bold text-ink-300">{category.count} prompts</p></Link>)}</div></div></div></section>

      <section className="page-shell py-16 sm:py-20"><div className="grid gap-10 border border-ink-800 bg-ink-900 px-7 py-9 text-paper-50 sm:p-12 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow text-forge-300">For practitioners</p><h2 className="display mt-3 max-w-2xl text-4xl text-paper-50 sm:text-5xl">Your methods have value. Put them to work for others.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-ink-100">Build a creator shelf, publish with context, and keep a clear view of the work people return to.</p></div><Link className="button-primary bg-forge-500" to="/seller/dashboard">Open creator workspace <ArrowRight className="h-4 w-4" /></Link></div></section>
    </div>
  );
}
