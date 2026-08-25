import { ArrowRight, Bookmark, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import GradientMesh from '@/components/GradientMesh';

export default function ShelfPage() {
  const { pathname } = useLocation();
  const isCart = pathname === '/cart';

  return (
    <div className="relative min-h-[60vh] flex items-center justify-center">
      <GradientMesh className="opacity-50" />
      <div className="relative z-10 page-shell py-20 text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #7c3aed20, #06b6d420)' }}
        >
          {isCart ? (
            <ShoppingBag className="h-7 w-7 text-accent-300" />
          ) : (
            <Bookmark className="h-7 w-7 text-accent-300" />
          )}
        </div>
        <p className="eyebrow mt-6">{isCart ? 'Your cart' : 'Your shelf'}</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">
          {isCart ? 'Your basket is waiting' : 'Your shelf is empty'}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-surface-700">
          {isCart
            ? 'Add a prompt when you are ready to make it part of your toolkit.'
            : 'Save promising prompts here, then return when the right project arrives.'}
        </p>
        <Link to="/explore" className="glow-button mt-8">
          Explore prompts <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
