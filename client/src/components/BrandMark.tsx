import { Link } from 'react-router-dom';

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="PromptForge home">
      <span className="relative grid h-8 w-8 place-items-center border border-ink-800 bg-ink-800 text-sm font-display italic text-paper-50 transition group-hover:-rotate-3 group-hover:bg-forge-600">P</span>
      {!compact && <span className="text-lg font-bold tracking-[-0.05em] text-ink-900">prompt<span className="text-forge-600">forge</span></span>}
    </Link>
  );
}
