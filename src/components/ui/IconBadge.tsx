import { type LucideIcon } from 'lucide-react';

interface IconBadgeProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  bg?: string;
  glow?: boolean;
}

export function IconBadge({ icon: Icon, size = 20, color = '#3dd6c6', bg, glow = false }: IconBadgeProps) {
  return (
    <div
      className="flex items-center justify-center rounded-xl shrink-0"
      style={{
        width: size + 16,
        height: size + 16,
        background: bg ?? `${color}1a`,
        border: `1px solid ${color}33`,
        boxShadow: glow ? `0 0 12px ${color}33` : undefined,
      }}
    >
      <Icon size={size} color={color} strokeWidth={2} />
    </div>
  );
}
