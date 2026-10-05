interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
  showValue?: boolean;
  animate?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  color = '#3dd6c6',
  height = 6,
  label,
  showValue = false,
  animate = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-ink-300">{label}</span>}
          {showValue && <span className="text-xs font-mono font-medium" style={{ color }}>{Math.round(value)}</span>}
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden bg-ink-700/50"
        style={{ height }}
      >
        <div
          className="rounded-full"
          style={{
            width: animate ? '0%' : `${percentage}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}55`,
            transition: animate ? 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            animationName: animate ? 'none' : undefined,
          }}
          ref={(el) => {
            if (el && animate) {
              requestAnimationFrame(() => {
                el.style.width = `${percentage}%`;
              });
            }
          }}
        />
      </div>
    </div>
  );
}
