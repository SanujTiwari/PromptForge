import { Link } from 'react-router-dom';
import BrandMark from '@/components/BrandMark';
import { Github, Twitter } from 'lucide-react';

const footerLinks = {
  Browse: [
    { label: 'All prompts', to: '/explore' },
    { label: 'Collections', to: '/categories' },
    { label: 'Trending', to: '/explore?sort=trending' },
    { label: 'Free prompts', to: '/explore?free=true' },
  ],
  Create: [
    { label: 'Creator workspace', to: '/seller/dashboard' },
    { label: 'Prompt studio', to: '/ai/generator' },
    { label: 'Seller guide', to: '#' },
  ],
  Company: [
    { label: 'About', to: '#' },
    { label: 'Blog', to: '#' },
    { label: 'Support', to: '#' },
    { label: 'Terms', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/[0.06] bg-deep-100">
      {/* Gradient top line */}
      <div
        className="absolute left-0 right-0 top-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent 10%, #7c3aed 50%, transparent 90%)' }}
      />

      <div className="page-shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <BrandMark />
            <p className="mt-5 max-w-xs text-sm leading-7 text-surface-700">
              The premium marketplace for AI prompts. Discover, buy, and sell prompts crafted by the best creators.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-surface-700 transition-all duration-200 hover:border-accent/30 hover:text-accent-300"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-surface-700 transition-all duration-200 hover:border-accent/30 hover:text-accent-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">{title}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-surface-700 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 flex flex-col items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Stay in the loop</p>
            <p className="mt-1 text-sm text-surface-700">Get weekly picks and creator spotlights in your inbox.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="glass-input flex-1 !rounded-xl !py-2.5 text-sm"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="glow-button shrink-0 !rounded-xl !px-5 !py-2.5 text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="page-shell flex flex-col gap-2 py-5 text-xs text-surface-600 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} PromptForge. All rights reserved.</span>
          <span>Crafted for makers who care about quality.</span>
        </div>
      </div>
    </footer>
  );
}
