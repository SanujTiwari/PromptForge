import { ArrowRight, BarChart3, CircleDollarSign, FilePlus2, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { prompts } from '@/data/catalog';
import StatCard from '@/components/StatCard';
import { useAppStore } from '@/store/useAppStore';

const dashboardStats = [
  { label: 'Revenue this month', value: '₹12,480', icon: CircleDollarSign, note: '↑ 18% from last month', color: '#10b981' },
  { label: 'Prompts in use', value: '4', icon: FilePlus2, note: '1 awaiting review', color: '#7c3aed' },
  { label: 'Average rating', value: '4.8', icon: Star, note: '58 total reviews', color: '#f59e0b' },
];

export default function CreatorDashboardPage() {
  const user = useAppStore((s) => s.user);
  const displayName = user?.displayName ?? 'Creator';

  return (
    <div className="page-shell py-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 border-b border-white/[0.06] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Creator workspace</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">
            Good morning, {displayName}.
          </h1>
          <p className="mt-3 text-sm text-surface-700">Your shelf is doing the quiet work.</p>
        </div>
        <Link className="glow-button shrink-0" to="/seller/prompts/create">
          <FilePlus2 className="h-4 w-4" /> New prompt
        </Link>
      </div>

      {/* Stats */}
      <section className="mt-8 grid gap-5 sm:grid-cols-3">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            note={stat.note}
            accentColor={stat.color}
          />
        ))}
      </section>

      {/* Content grid */}
      <section className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
        {/* Listings table */}
        <div>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Your listings</p>
              <h2 className="display mt-2 text-2xl sm:text-3xl">What people return to</h2>
            </div>
            <Link className="button-link" to="/seller/prompts">
              Manage all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-5 divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            {prompts.slice(0, 4).map((prompt, index) => (
              <div key={prompt.slug} className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02]">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ background: prompt.creatorGradient }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{prompt.title}</p>
                  <p className="mt-0.5 text-xs text-surface-700">
                    {prompt.sales} uses · {prompt.rating} rating
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">₹{[5120, 3680, 1940, 2850][index]}</p>
                  <p className="text-xs text-success-400">
                    <TrendingUp className="mr-0.5 inline h-3 w-3" />
                    {['+12%', '+8%', '+15%', '+5%'][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insight card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06]">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.08) 100%)' }}
          />
          <div className="relative z-10 p-6">
            <BarChart3 className="h-5 w-5 text-accent-300" />
            <p className="eyebrow mt-7">A useful signal</p>
            <h3 className="display mt-3 text-2xl sm:text-3xl">
              Your strategy brief is getting saved more than bought.
            </h3>
            <p className="mt-4 text-sm leading-6 text-surface-700">
              Consider adding a short, protected demo so visitors can feel its structure before committing.
            </p>
            <button className="button-ghost mt-7">View listing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
