import { Shield } from 'lucide-react';
import { navItems, type Page } from './navConfig';
import { useApp } from '@/context/AppContext';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ current, onNavigate }: SidebarProps) {
  const { state, getLevel } = useApp();
  const level = getLevel();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-ink-700/40 bg-ink-900/60 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-ink-700/30">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Shield size={18} className="text-ink-950" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-xl bg-primary/30 animate-pulse-ring" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-white leading-none">CLICKED.</h1>
            <p className="text-[9px] text-ink-300 uppercase tracking-[0.15em] mt-0.5">Security Awareness</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                active
                  ? 'text-white bg-ink-700/50'
                  : 'text-ink-300 hover:text-white hover:bg-ink-700/30'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary shadow-glow" />
              )}
              <Icon
                size={18}
                className={active ? 'text-primary' : 'text-ink-400 group-hover:text-ink-200'}
                strokeWidth={2}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Level card */}
      <div className="px-4 pb-4">
        <div className="card-surface p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success animate-blink-dot" />
            <span className="text-[10px] uppercase tracking-wider text-ink-300">Current Level</span>
          </div>
          <p className="font-display font-bold text-white text-sm">{level.name}</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-ink-300 font-mono">{state.xp} XP</span>
            {level.nextXP && <span className="text-ink-400 font-mono">{level.nextXP} XP</span>}
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-ink-700/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
              style={{
                width: level.nextXP
                  ? `${Math.min(100, ((state.xp - level.minXP) / (level.nextXP - level.minXP)) * 100)}%`
                  : '100%',
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
