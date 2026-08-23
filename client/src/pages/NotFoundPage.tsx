import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container-main py-32 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-surface-400" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 mb-3">Page Not Found</h1>
        <p className="text-surface-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
