import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
  accentColor?: string;
}

export default function StatCard({ icon: Icon, label, value, note, accentColor = '#7c3aed' }: StatCardProps) {
  return (
    <div className="glass-card group p-6">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `${accentColor}20` }}
      >
        <Icon className="h-5 w-5" style={{ color: accentColor }} />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-surface-700">{label}</p>
      <p className="display mt-2 text-3xl lg:text-4xl">{value}</p>
      {note && <p className="mt-2 text-xs font-medium text-success-400">{note}</p>}
    </div>
  );
}
