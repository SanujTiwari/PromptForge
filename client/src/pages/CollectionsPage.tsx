import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, prompts } from '@/data/catalog';

export default function CollectionsPage() {
  return <div className="page-shell py-12 sm:py-16"><p className="eyebrow">Organized for return visits</p><h1 className="display mt-2 max-w-3xl text-5xl leading-[.94] sm:text-6xl">Collections for the work you want to do well.</h1><div className="mt-12 grid border-l border-t border-paper-300 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category, index) => { const representative = prompts.find((prompt) => prompt.category === category.name); return <Link key={category.name} to={`/explore?category=${encodeURIComponent(category.name)}`} className="group min-h-64 border-b border-r border-paper-300 bg-white p-6 transition hover:bg-paper-100"><div className="flex items-start justify-between"><span className="text-xs font-bold text-ink-300">{String(index + 1).padStart(2, '0')}</span><ArrowRight className="h-4 w-4 text-ink-300 transition group-hover:translate-x-1 group-hover:text-forge-600" /></div><h2 className="display mt-12 text-3xl">{category.name}</h2><p className="mt-3 max-w-xs text-sm leading-6 text-ink-500">{category.note}</p><p className="mt-6 text-xs font-bold uppercase tracking-[.12em] text-forge-600">{category.count} prompts · e.g. {representative?.title}</p></Link>; })}</div></div>;
}
