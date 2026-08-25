export default function GradientMesh({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* Primary violet blob */}
      <div
        className="absolute -left-[15%] -top-[20%] h-[600px] w-[600px] animate-float rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
      />
      {/* Secondary cyan blob */}
      <div
        className="absolute -right-[10%] top-[10%] h-[500px] w-[500px] animate-float-delayed rounded-full opacity-15 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }}
      />
      {/* Accent rose blob */}
      <div
        className="absolute -bottom-[10%] left-[30%] h-[400px] w-[400px] animate-float rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)' }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
