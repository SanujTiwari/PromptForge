import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bookmark, LogOut, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import SearchPalette from '@/components/SearchPalette';
import { useAppStore } from '@/store/useAppStore';

const navItems = [
  { label: 'Explore', to: '/explore' },
  { label: 'Collections', to: '/categories' },
  { label: 'For creators', to: '/seller/dashboard' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAppStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-deep/80 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        {/* Gradient accent line */}
        <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, #06b6d4, transparent)' }} />

        <div className="page-shell flex h-[72px] items-center justify-between gap-4">
          <BrandMark />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/10 text-accent-300'
                      : 'text-surface-800 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-surface-700 transition-all duration-200 hover:border-accent/30 hover:text-surface-900 sm:flex"
              aria-label="Search prompts"
            >
              <Search className="h-3.5 w-3.5" />
              Search
              <kbd className="ml-3 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.6rem] text-surface-600">⌘K</kbd>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-700 transition-all duration-200 hover:bg-white/[0.06] hover:text-accent-300"
              aria-label="Open wishlist"
            >
              <Bookmark className="h-4 w-4" />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-surface-700 transition-all duration-200 hover:bg-white/[0.06] hover:text-accent-300 sm:flex"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
            </Link>

            {/* Auth button or user menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
                  aria-label="User menu"
                >
                  {user.displayName.charAt(0).toUpperCase()}
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-12 z-50 w-56 animate-scale-in rounded-xl border border-white/10 bg-surface-200 p-2 shadow-xl">
                      <div className="border-b border-white/[0.06] px-3 py-2.5 mb-1">
                        <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                        <p className="text-xs text-surface-700 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/seller/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-surface-800 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <User className="h-4 w-4" /> Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger-400 transition hover:bg-danger/10"
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="glow-button hidden py-2 text-xs md:inline-flex">
                Sign in
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-surface-800 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="page-shell animate-slide-down border-t border-white/[0.06] pb-4 pt-3 md:hidden"
            aria-label="Mobile navigation"
          >
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-surface-800 transition hover:bg-white/[0.04] hover:text-white"
              >
                {label}
              </NavLink>
            ))}
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-semibold text-accent-300"
              >
                Sign in
              </Link>
            )}
          </nav>
        )}
      </header>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
