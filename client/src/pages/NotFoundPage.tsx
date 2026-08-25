import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import GradientMesh from '@/components/GradientMesh';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      <GradientMesh className="opacity-50" />
      <div className="relative z-10 page-shell py-20 text-center">
        <p className="gradient-text text-[8rem] font-bold leading-none sm:text-[10rem]">404</p>
        <h1 className="display mt-4 text-3xl sm:text-4xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-surface-700">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="glow-button mt-8">
          Go home <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
