import { ArrowRight, Command, Search, Sparkles, Star, TrendingUp, Users, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PromptCard from '@/components/PromptCard';
import GradientMesh from '@/components/GradientMesh';
import { categories, prompts, stats } from '@/data/catalog';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/explore${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  };

  const featured = prompts.filter((p) => p.isFeatured).slice(0, 3);
  const trending = prompts.filter((p) => p.isTrending).slice(0, 4);

  return (
    <div>
      {/* ─── Hero ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-white/[0.04]">
        <GradientMesh />
        <div className="page-shell relative z-10 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold text-accent-300">
              <Sparkles className="h-3.5 w-3.5" />
              The premium AI prompt marketplace
            </div>

            <h1 className="display mt-8 text-balance text-4xl leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
              Find the prompts that{' '}
              <span className="gradient-text">move work forward</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-surface-700 sm:text-lg">
              Discover, buy, and sell high-quality AI prompts tested by real practitioners.
              Every listing is crafted with context, constraints, and clear outcomes.
            </p>

            {/* Search bar */}
            <form
              onSubmit={submitSearch}
              className="mx-auto mt-10 flex max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 shadow-glass transition-all duration-300 focus-within:border-accent/30 focus-within:shadow-glow"
            >
              <Search className="ml-4 h-5 w-5 shrink-0 self-center text-accent" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-surface-600"
                placeholder="Search writing, code, research, marketing…"
                aria-label="Search prompts"
              />
              <button className="glow-button shrink-0 !rounded-xl !px-5 !py-2.5" type="submit">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-surface-600">
              <Command className="h-3.5 w-3.5" />
              Press <strong className="font-bold text-surface-800">Ctrl K</strong> to quick search
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Stats ─────────────────────── */}
      <section className="border-b border-white/[0.04] bg-white/[0.01]">
        <div className="page-shell grid grid-cols-2 gap-4 py-10 sm:py-12 md:grid-cols-4">
          {[
            { icon: Sparkles, label: 'Prompts', value: stats.totalPrompts, color: '#7c3aed' },
            { icon: Users, label: 'Creators', value: stats.totalCreators, color: '#06b6d4' },
            { icon: Download, label: 'Downloads', value: stats.totalDownloads, color: '#10b981' },
            { icon: Star, label: 'Avg Rating', value: stats.avgRating, color: '#f59e0b' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl p-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
                <p className="text-xs text-surface-700">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Prompts ─────────────────────── */}
      <section className="page-shell py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Editor's picks</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">Featured prompts</h2>
          </div>
          <Link className="button-link shrink-0" to="/explore">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((prompt, index) => (
            <PromptCard key={prompt.slug} prompt={prompt} index={index} />
          ))}
        </div>
      </section>

      {/* ─── Categories ───────────────────────────── */}
      <section className="border-y border-white/[0.04] bg-white/[0.01]">
        <div className="page-shell py-16 sm:py-20">
          <div className="mb-10 grid gap-6 lg:grid-cols-[.8fr_2.2fr]">
            <div>
              <p className="eyebrow">Browse by discipline</p>
              <h2 className="display mt-2 text-3xl leading-tight sm:text-4xl">
                A collection for every kind of work
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/explore?category=${encodeURIComponent(category.name)}`}
                className="glass-card group p-5"
              >
                <span className="text-2xl">{category.icon}</span>
                <p className="mt-4 text-sm font-bold text-white">{category.name}</p>
                <p className="mt-1.5 text-xs leading-5 text-surface-700">{category.note}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent-300">{category.count} prompts</span>
                  <ArrowRight className="h-3.5 w-3.5 text-surface-600 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trending ─────────────────────────────── */}
      <section className="page-shell py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5" /> Trending now
            </p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">What people are using</h2>
          </div>
          <Link className="button-link shrink-0" to="/explore?sort=trending">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((prompt, index) => (
            <PromptCard key={prompt.slug} prompt={prompt} index={index} />
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────── */}
      <section className="page-shell pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 50%, rgba(244,63,94,0.08) 100%)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="relative z-10 grid gap-8 p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-end lg:p-16">
            <div>
              <p className="eyebrow">For creators</p>
              <h2 className="display mt-3 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
                Your methods have value.{' '}
                <span className="gradient-text">Put them to work.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-surface-700">
                Build a creator profile, publish prompts with context, and earn from the work others return to.
                Join 8,200+ creators already selling on PromptForge.
              </p>
            </div>
            <Link className="glow-button shrink-0 !rounded-2xl !px-8 !py-4" to="/seller/dashboard">
              Start creating <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
