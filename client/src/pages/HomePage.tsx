import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  ArrowRight,
  Zap,
  ShieldCheck,
  TrendingUp,
  Star,
  Users,
  MessageSquare,
  Palette,
  Code,
  FileText,
  Image,
  Music,
  Briefcase,
  GraduationCap,
  CircleCheck,
  CircleX,
  Loader2,
} from 'lucide-react';
import { healthService } from '@/services/health.service';

// ─── Category Data ───────────────────────────────────────
const categories = [
  { name: 'Writing', icon: FileText, color: 'from-blue-500 to-blue-600', count: '2.4k' },
  { name: 'Coding', icon: Code, color: 'from-emerald-500 to-emerald-600', count: '1.8k' },
  { name: 'Art & Design', icon: Palette, color: 'from-purple-500 to-purple-600', count: '3.1k' },
  { name: 'Marketing', icon: TrendingUp, color: 'from-orange-500 to-orange-600', count: '1.2k' },
  { name: 'Image Gen', icon: Image, color: 'from-pink-500 to-pink-600', count: '4.5k' },
  { name: 'Music', icon: Music, color: 'from-amber-500 to-amber-600', count: '890' },
  { name: 'Business', icon: Briefcase, color: 'from-cyan-500 to-cyan-600', count: '1.5k' },
  { name: 'Education', icon: GraduationCap, color: 'from-indigo-500 to-indigo-600', count: '920' },
];

// ─── Trending Prompt Preview Data ────────────────────────
const trendingPrompts = [
  {
    title: 'AI Resume Optimizer',
    category: 'Career',
    model: 'ChatGPT',
    rating: 4.8,
    sales: 342,
    price: '₹99',
    creator: 'PromptPro',
  },
  {
    title: 'Midjourney Scene Creator',
    category: 'Art & Design',
    model: 'Midjourney',
    rating: 4.9,
    sales: 1204,
    price: '₹149',
    creator: 'ArtForge',
  },
  {
    title: 'Blog Post Generator',
    category: 'Writing',
    model: 'Claude',
    rating: 4.7,
    sales: 856,
    price: '₹79',
    creator: 'WriterBot',
  },
  {
    title: 'React Component Builder',
    category: 'Coding',
    model: 'ChatGPT',
    rating: 4.6,
    sales: 612,
    price: '₹129',
    creator: 'DevCraft',
  },
  {
    title: 'SEO Meta Description',
    category: 'Marketing',
    model: 'GPT-4',
    rating: 4.5,
    sales: 478,
    price: 'Free',
    creator: 'SEOWizard',
  },
  {
    title: 'Fantasy Character Art',
    category: 'Image Gen',
    model: 'DALL·E',
    rating: 4.8,
    sales: 934,
    price: '₹199',
    creator: 'PixelDream',
  },
];

// ─── How It Works Steps ──────────────────────────────────
const howItWorks = [
  {
    step: '01',
    title: 'Browse Prompts',
    description: 'Explore thousands of AI prompts across categories. Filter by model, rating, and price.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Purchase Instantly',
    description: 'Buy prompts securely with one click. Get instant access to high-quality prompt templates.',
    icon: Zap,
  },
  {
    step: '03',
    title: 'Use & Create',
    description: 'Paste prompts into your favorite AI tool. Get amazing results. Create and sell your own.',
    icon: Sparkles,
  },
];

// ─── Stats ───────────────────────────────────────────────
const stats = [
  { label: 'Prompts Listed', value: '15,000+', icon: MessageSquare },
  { label: 'Active Creators', value: '2,500+', icon: Users },
  { label: 'Average Rating', value: '4.8', icon: Star },
  { label: 'Downloads', value: '50,000+', icon: TrendingUp },
];

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState<'loading' | 'connected' | 'error'>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await healthService.check();
        setHealthStatus(result.success ? 'connected' : 'error');
      } catch {
        setHealthStatus('error');
      }
    };
    checkHealth();
  }, []);

  return (
    <div>
      {/* ───────────────── Hero Section ───────────────── */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-50 via-brand-50/30 to-accent-50/20" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />

        <div className="container-main relative py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Health Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-surface-200 shadow-sm mb-8 animate-fade-in">
              {healthStatus === 'loading' && (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-surface-400 animate-spin" />
                  <span className="text-xs font-medium text-surface-500">Connecting to API...</span>
                </>
              )}
              {healthStatus === 'connected' && (
                <>
                  <CircleCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-600">Backend Connected</span>
                </>
              )}
              {healthStatus === 'error' && (
                <>
                  <CircleX className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-xs font-medium text-red-600">Backend Offline</span>
                </>
              )}
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 leading-tight tracking-tight mb-6 animate-slide-up">
              Discover prompts that
              <br />
              <span className="text-gradient">actually work.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-surface-500 max-w-2xl mx-auto mb-10 animate-slide-up animate-delay-100">
              Buy, sell and discover high-quality AI prompts created by the community.
              Supercharge your workflow with tested, production-ready prompts.
            </p>

            {/* Hero Search */}
            <div className="max-w-xl mx-auto mb-8 animate-slide-up animate-delay-200">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search AI prompts..."
                  className="w-full pl-12 pr-32 py-4 rounded-2xl text-base bg-white border border-surface-200 
                           shadow-card text-surface-800 placeholder-surface-400
                           focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                           transition-all duration-300"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary py-2.5 px-6 rounded-xl text-sm">
                  Search
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up animate-delay-300">
              <Link to="/explore" className="btn-primary btn-lg">
                Explore Prompts
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/sell" className="btn-secondary btn-lg">
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Stats Bar ───────────────────── */}
      <section className="border-y border-surface-200 bg-white">
        <div className="container-main py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-surface-900">{stat.value}</p>
                  <p className="text-xs text-surface-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Categories ──────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Popular Categories</h2>
            <p className="section-subheading mx-auto">
              Browse prompts across dozens of categories for every AI model.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/explore?category=${cat.name.toLowerCase()}`}
                className="card group p-5 flex items-center gap-4 hover:border-brand-300"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center
                             transition-transform duration-300 group-hover:scale-110`}
                >
                  <cat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-800 group-hover:text-brand-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-surface-400">{cat.count} prompts</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Trending Prompts ────────────── */}
      <section className="py-20 bg-surface-50">
        <div className="container-main">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-heading mb-3">Trending Prompts</h2>
              <p className="section-subheading">
                The most popular prompts this week, handpicked by our community.
              </p>
            </div>
            <Link
              to="/explore"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {trendingPrompts.map((prompt) => (
              <div
                key={prompt.title}
                className="card group overflow-hidden"
              >
                {/* Card gradient header */}
                <div className="h-2 bg-gradient-to-r from-brand-500 to-accent-500" />

                <div className="p-5">
                  {/* Category & Model */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-brand">{prompt.category}</span>
                    <span className="badge bg-surface-100 text-surface-600 border border-surface-200 text-xs px-2 py-0.5 rounded-full font-medium">
                      {prompt.model}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-surface-800 mb-2 group-hover:text-brand-700 transition-colors">
                    {prompt.title}
                  </h3>

                  {/* Creator */}
                  <p className="text-xs text-surface-400 mb-4">
                    by <span className="text-surface-600 font-medium">{prompt.creator}</span>
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-surface-700">{prompt.rating}</span>
                      </div>
                      <span className="text-xs text-surface-400">{prompt.sales} sales</span>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        prompt.price === 'Free'
                          ? 'text-emerald-600'
                          : 'text-surface-900'
                      }`}
                    >
                      {prompt.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "View all" link */}
          <div className="sm:hidden mt-6 text-center">
            <Link
              to="/explore"
              className="btn-secondary"
            >
              View all prompts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────────── How It Works ────────────────── */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-3">How PromptForge Works</h2>
            <p className="section-subheading mx-auto">
              Get started in minutes. Find, buy, and use AI prompts instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center
                               group-hover:bg-brand-100 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-600 text-white
                               text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── Become a Seller CTA ─────────── */}
      <section className="py-20 bg-surface-950">
        <div className="container-main">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-accent-600" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-6">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-xs font-medium text-white/90">Trusted by 2,500+ creators</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Start Selling Your Prompts
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-8">
                Turn your AI expertise into income. Create a seller account, upload your best prompts,
                and reach thousands of buyers.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/sell"
                  className="btn bg-white text-brand-700 hover:bg-white/90 font-semibold btn-lg"
                >
                  Become a Seller
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/seller/guide"
                  className="btn border border-white/30 text-white hover:bg-white/10 btn-lg"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
