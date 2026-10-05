import { type LucideIcon, CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-ink-700/40 border border-ink-600/30">
        <Icon size={28} className="text-ink-300" />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink-100 mb-1">{title}</h3>
      <p className="text-sm text-ink-300 max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}

interface StatusBannerProps {
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

export function StatusBanner({ type, title, message }: StatusBannerProps) {
  const config = {
    success: { icon: CheckCircle2, color: '#3ee08a', bg: 'rgba(62, 224, 138, 0.08)' },
    warning: { icon: AlertTriangle, color: '#ffaa33', bg: 'rgba(255, 170, 51, 0.08)' },
    error: { icon: XCircle, color: '#ff5c5c', bg: 'rgba(255, 92, 92, 0.08)' },
    info: { icon: Info, color: '#4d8dff', bg: 'rgba(77, 141, 255, 0.08)' },
  };
  const { icon: Icon, color, bg } = config[type];

  return (
    <div
      className="flex items-start gap-3 rounded-xl p-4 animate-fade-in"
      style={{ background: bg, border: `1px solid ${color}33` }}
    >
      <Icon size={20} style={{ color }} className="shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold" style={{ color }}>{title}</p>
        {message && <p className="text-xs text-ink-300 mt-0.5">{message}</p>}
      </div>
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: number;
  label?: string;
}

export function LoadingSpinner({ size = 32, label }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div
        className="rounded-full border-2 border-ink-600 border-t-primary animate-spin"
        style={{ width: size, height: size }}
      />
      {label && <p className="text-sm text-ink-300 mt-3">{label}</p>}
    </div>
  );
}
