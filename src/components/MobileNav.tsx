import { navItems, type Page } from './navConfig';
import { Shield } from 'lucide-react';

interface MobileNavProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export function MobileNav({ current, onNavigate }: MobileNavProps) {
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 glass-strong border-b border-ink-700/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Shield size={16} className="text-ink-950" strokeWidth={2.5} />
          </div>
          <h1 className="font-display font-bold text-base text-white tracking-tight">CLICKED.</h1>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-300">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-blink-dot" />
          Active
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-ink-700/30 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around px-1 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] ${
                  active ? 'text-primary' : 'text-ink-400'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[9px] font-medium ${active ? 'text-primary' : 'text-ink-400'}`}>
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
