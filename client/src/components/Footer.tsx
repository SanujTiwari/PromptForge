import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Explore Prompts', href: '/explore' },
    { label: 'Categories', href: '/categories' },
    { label: 'Free Prompts', href: '/free' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Sellers: [
    { label: 'Start Selling', href: '/sell' },
    { label: 'Seller Dashboard', href: '/seller/dashboard' },
    { label: 'Seller Guide', href: '/seller/guide' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refunds' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-950 text-surface-400 mt-auto">
      {/* Main Footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Prompt<span className="text-brand-400">Forge</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 leading-relaxed mb-6">
              Discover, buy, sell, and share high-quality AI prompts created by the community.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-surface-900 text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-surface-900 text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-surface-900 text-surface-400 hover:text-white hover:bg-surface-800 transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide uppercase">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-surface-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-800">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-600">
            &copy; {currentYear} PromptForge. All rights reserved.
          </p>
          <p className="text-xs text-surface-700">
            Built for creators, by creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
