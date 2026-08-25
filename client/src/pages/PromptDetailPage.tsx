import { Bookmark, Check, ChevronRight, LockKeyhole, ShoppingCart, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice, prompts } from '@/data/catalog';
import PromptCard from '@/components/PromptCard';

export default function PromptDetailPage() {
  const { slug } = useParams();
  const prompt = prompts.find((p) => p.slug === slug) ?? prompts[0];
  const related = prompts.filter((p) => p.slug !== prompt.slug && p.category === prompt.category).slice(0, 2);
  const moreRelated = related.length < 2 ? prompts.filter((p) => p.slug !== prompt.slug).slice(0, 2) : related;

  return (
    <div className="page-shell py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-surface-600">
        <Link to="/explore" className="transition hover:text-accent-300">Catalog</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/explore?category=${prompt.category}`} className="transition hover:text-accent-300">{prompt.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-surface-800">{prompt.title}</span>
      </nav>

      {/* Main grid */}
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14">
        {/* Left: Content */}
        <article>
          <div className="flex flex-wrap gap-2">
            <span className="badge">{prompt.category}</span>
            <span className="badge">Made for {prompt.model}</span>
            {prompt.isFeatured && <span className="badge-accent"><Star className="h-3 w-3" /> Featured</span>}
          </div>

          <h1 className="display mt-6 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {prompt.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-surface-700">{prompt.description}</p>

          {/* Creator bar */}
          <div className="mt-7 flex items-center gap-3 border-y border-white/[0.06] py-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: prompt.creatorGradient }}
            >
              {prompt.creatorInitials}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{prompt.creator}</p>
              <p className="text-xs text-surface-700">Creator · {prompt.sales} people using it</p>
            </div>
            <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold">
              <Star className="h-4 w-4 fill-warning text-warning" />
              {prompt.rating}
              <span className="font-normal text-surface-600">({prompt.reviews})</span>
            </span>
          </div>

          {/* Preview section */}
          <section className="mt-10">
            <p className="eyebrow">Inside the prompt</p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-surface-200">
              <div className="border-b border-white/[0.06] px-6 py-3">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-accent-300">
                  Preview · first section
                </span>
              </div>
              <div className="p-6">
                <p className="font-mono text-sm leading-7 text-surface-900">{prompt.excerpt}</p>
                <div className="relative mt-5 overflow-hidden border-t border-white/[0.06] pt-5">
                  <p className="select-none font-mono text-sm leading-7 text-surface-600 blur-[4px]">
                    Ask questions only after you have named the actual audience, decision, and boundary. Return the outcome in a format that can be acted on immediately.
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-surface-200/70 to-surface-200">
                    <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-surface-300 px-4 py-2.5 text-xs font-semibold shadow-lg">
                      <LockKeyhole className="h-3.5 w-3.5 text-accent-300" />
                      Unlock full prompt to continue
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What you get + tags */}
          <section className="mt-10 grid gap-8 border-t border-white/[0.06] pt-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">What you get</p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-surface-800">
                {[
                  'The complete prompt, ready to adapt',
                  'Clear usage notes and context',
                  'A practical input and output example',
                  'Future version updates included',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Built for</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews preview */}
          <section className="mt-10 border-t border-white/[0.06] pt-8">
            <p className="eyebrow">What users say</p>
            <div className="mt-4 space-y-4">
              {[
                { name: 'Alex M.', rating: 5, text: 'Exactly what I needed for my workflow. Saved me hours of prompt engineering.', time: '2 days ago' },
                { name: 'Sarah K.', rating: 5, text: 'The context and constraints included make this immediately useful. Worth every rupee.', time: '1 week ago' },
                { name: 'Dev P.', rating: 4, text: 'Solid prompt with good structure. Would love to see more examples in future versions.', time: '2 weeks ago' },
              ].map((review) => (
                <div key={review.name} className="glass-card-static rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent-300">
                        {review.name.charAt(0)}
                      </span>
                      <span className="text-sm font-semibold text-white">{review.name}</span>
                    </div>
                    <span className="text-xs text-surface-600">{review.time}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-warning text-warning' : 'text-surface-500'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2.5 text-sm leading-6 text-surface-800">{review.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Right: Purchase sidebar */}
        <aside>
          <div className="sticky top-24 glass-card-static overflow-hidden rounded-2xl">
            {/* Price header with gradient */}
            <div
              className="px-6 py-5"
              style={{
                background: prompt.accent === 'violet' ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))'
                  : prompt.accent === 'cyan' ? 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(6,182,212,0.05))'
                  : prompt.accent === 'emerald' ? 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))'
                  : prompt.accent === 'rose' ? 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(244,63,94,0.05))'
                  : 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-surface-700">One-time access</p>
              <p className={`display mt-3 text-5xl ${prompt.price === 0 ? 'text-success-400' : ''}`}>
                {formatPrice(prompt.price)}
              </p>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-surface-700">
                Keep this prompt on your shelf and use it whenever the work calls for it.
              </p>
              <button className="glow-button mt-6 w-full !rounded-xl">
                <ShoppingCart className="h-4 w-4" />
                {prompt.price === 0 ? 'Add to shelf' : 'Unlock full prompt'}
              </button>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-surface-700 transition-all duration-200 hover:bg-white/[0.04] hover:text-accent-300">
                <Bookmark className="h-4 w-4" />
                Save for later
              </button>
              <div className="mt-5 border-t border-white/[0.06] pt-4 text-xs leading-5 text-surface-700">
                <strong className="text-surface-800">Try before you buy:</strong> A protected demo is available when this prompt supports it.
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related prompts */}
      <section className="mt-16 border-t border-white/[0.06] pt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Keep exploring</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">More like this</h2>
          </div>
          <Link to="/explore" className="button-link">All prompts</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {moreRelated.map((item, index) => (
            <PromptCard key={item.slug} prompt={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
