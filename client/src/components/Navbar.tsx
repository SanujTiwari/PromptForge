import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Bookmark, Menu, Search, ShoppingBag, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import SearchPalette from '@/components/SearchPalette';

const navItems = [
  { label: 'Explore', to: '/explore' },
  { label: 'Collections', to: '/categories' },
  { label: 'For creators', to: '/seller/dashboard' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <header className="border-b border-paper-300 bg-paper-50/95 backdrop-blur">
        <div className="page-shell flex h-[72px] items-center justify-between gap-4">
          <BrandMark />
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map(({ label, to }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-bold transition ${isActive ? 'text-forge-600' : 'text-ink-500 hover:text-ink-900'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} className="hidden items-center gap-2 border border-paper-300 bg-white px-3 py-2 text-xs font-semibold text-ink-500 transition hover:border-ink-300 hover:text-ink-800 sm:flex" aria-label="Search prompts">
              <Search className="h-4 w-4" /> Search <kbd className="ml-4 border-l border-paper-300 pl-2 text-[0.65rem] text-ink-300">⌘ K</kbd>
            </button>
            <Link to="/wishlist" className="grid h-9 w-9 place-items-center text-ink-500 transition hover:bg-paper-100 hover:text-forge-600" aria-label="Open wishlist"><Bookmark className="h-4 w-4" /></Link>
            <Link to="/cart" className="hidden h-9 w-9 place-items-center text-ink-500 transition hover:bg-paper-100 hover:text-forge-600 sm:grid" aria-label="Open cart"><ShoppingBag className="h-4 w-4" /></Link>
            <Link to="/login" className="button-primary hidden py-2 md:inline-flex">Sign in</Link>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="grid h-9 w-9 place-items-center md:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && <nav className="page-shell animate-catalog-in border-t border-paper-300 py-4 md:hidden" aria-label="Mobile navigation">{navItems.map(({ label, to }) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-bold text-ink-700">{label}</NavLink>)}<Link to="/login" className="mt-2 block py-2 text-sm font-bold text-forge-600">Sign in</Link></nav>}
      </header>
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
