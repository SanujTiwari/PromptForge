import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: 'border-success/30 bg-success/10 text-success-400',
  error: 'border-danger/30 bg-danger/10 text-danger-400',
  info: 'border-accent/30 bg-accent/10 text-accent-300',
};

export default function ToastContainer() {
  const toasts = useAppStore((s) => s.toasts);
  const removeToast = useAppStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-xl animate-slide-up ${colors[toast.type]}`}
            role="alert"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="flex-1 text-sm font-medium text-white">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="mt-0.5 shrink-0 text-white/40 transition hover:text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
