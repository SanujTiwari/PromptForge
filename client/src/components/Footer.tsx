import { Link } from 'react-router-dom';
import BrandMark from '@/components/BrandMark';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-700 bg-ink-900 text-paper-200">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div><BrandMark /><p className="mt-4 max-w-xs text-sm leading-6 text-ink-100">A considered market for prompts that earn a place in your working library.</p></div>
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-forge-300">Browse</p><div className="grid gap-2 text-sm"><Link to="/explore">All prompts</Link><Link to="/categories">Collections</Link><Link to="/wishlist">Your shelf</Link></div></div>
        <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-forge-300">Create</p><div className="grid gap-2 text-sm"><Link to="/seller/dashboard">Creator workspace</Link><Link to="/ai/generator">Prompt studio</Link><Link to="/login">Sign in</Link></div></div>
      </div>
      <div className="border-t border-ink-700"><div className="page-shell flex flex-col gap-2 py-5 text-xs text-ink-100 sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} PromptForge</span><span>Made for work worth keeping.</span></div></div>
    </footer>
  );
}
