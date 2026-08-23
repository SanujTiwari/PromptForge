import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { prompts } from '@/data/catalog';

export default function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  useEffect(() => { if (open) setQuery(''); }, [open]);
  useEffect(() => { const escape = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [onClose]);
  const results = useMemo(() => prompts.filter((prompt) => `${prompt.title} ${prompt.category} ${prompt.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5), [query]);
  if (!open) return null;
  const choose = (slug: string) => { navigate(`/prompts/${slug}`); onClose(); };
  return (
    <div className="fixed inset-0 z-[100] bg-ink-900/40 p-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search prompts" onMouseDown={onClose}>
      <div className="mx-auto max-w-2xl border border-ink-700 bg-paper-50 shadow-lift" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center border-b border-paper-300 px-4"><Search className="mr-3 h-5 w-5 text-forge-600" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="h-16 flex-1 bg-transparent text-lg text-ink-900 outline-none placeholder:text-ink-300" placeholder="Search the forge…" /><button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center text-ink-500" aria-label="Close search"><X className="h-4 w-4" /></button></div>
        <div className="p-2">{query.length === 0 && <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-300">Suggested from the shelf</p>}{results.map((prompt) => <button type="button" key={prompt.slug} onClick={() => choose(prompt.slug)} className="flex w-full items-center justify-between gap-4 px-3 py-3 text-left transition hover:bg-paper-100"><span><span className="block text-sm font-bold text-ink-800">{prompt.title}</span><span className="mt-0.5 block text-xs text-ink-500">{prompt.category} · {prompt.model}</span></span><ArrowUpRight className="h-4 w-4 text-ink-300" /></button>)}{results.length === 0 && <p className="p-5 text-center text-sm text-ink-500">No prompt matches that search yet.</p>}</div>
        <div className="flex justify-between border-t border-paper-300 px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-300"><span>Use search to discover</span><span>Esc to close</span></div>
      </div>
    </div>
  );
}
