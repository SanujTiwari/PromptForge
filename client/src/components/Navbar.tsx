import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Menu,
  X,
  ShoppingBag,
  Heart,
  User,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const navLinks = [
  { label: 'Explore', href: '/explore' },
  { label: 'Categories', href: '/categories' },
  { label: 'Free Prompts', href: '/free' },
  { label: 'Sell', href: '/sell' },
];

export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useAppStore();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-200/60">
      <div className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 tracking-tight">
              Prompt<span className="text-gradient">Forge</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div
              className={`relative w-full transition-all duration-300 ${
                isSearchFocused ? 'scale-105' : ''
              }`}
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                className="input pl-10 pr-4 py-2 bg-surface-50 border-surface-200 text-sm rounded-xl"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-surface-600 rounded-lg
                         hover:text-surface-900 hover:bg-surface-100
                         transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 ml-4">
            <button
              className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-all duration-200"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-all duration-200"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-surface-200 mx-1" />
            <Link
              to="/login"
              className="btn-ghost text-sm py-2 px-4"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="btn-primary text-sm py-2 px-4"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            {/* Mobile Search */}
            <div className="px-1 mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search prompts..."
                  className="input pl-10 pr-4 py-2.5 bg-surface-50 text-sm"
                />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-0.5 px-1 mb-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className="px-3 py-2.5 text-sm font-medium text-surface-600 rounded-lg
                           hover:text-surface-900 hover:bg-surface-100
                           transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-2 px-1 pt-3 border-t border-surface-200">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="btn-secondary w-full justify-center"
              >
                <User className="w-4 h-4" />
                Log in
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="btn-primary w-full justify-center"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
