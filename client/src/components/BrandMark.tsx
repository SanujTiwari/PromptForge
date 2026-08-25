import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="PromptForge home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <span
          className="absolute inset-0 transition-opacity duration-300"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
        />
        <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)' }}
        />
        <Sparkles className="relative z-10 h-4 w-4 text-white" />
      </span>
      {!compact && (
        <span className="text-lg font-bold tracking-[-0.03em] text-white">
          prompt<span className="gradient-text">forge</span>
        </span>
      )}
    </Link>
  );
}
