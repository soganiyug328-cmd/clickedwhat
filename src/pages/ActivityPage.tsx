import { useApp } from '@/context/AppContext';
import { getIcon } from '@/components/iconRegistry';
import type { LucideIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/Feedback';
import type { ActivityEvent } from '@/types';

const eventConfig: Record<ActivityEvent['type'], { icon: LucideIcon; color: string }> = {
  scenario_complete: { icon: getIcon('Crosshair'), color: '#3dd6c6' },
  score_change: { icon: getIcon('TrendingUp'), color: '#4d8dff' },
  badge_unlock: { icon: getIcon('Trophy'), color: '#ffaa33' },
  level_up: { icon: getIcon('Star'), color: '#3ee08a' },
  lesson_complete: { icon: getIcon('BookOpen'), color: '#b388ff' },
};

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function ActivityPage() {
  const { state } = useApp();
  const ActivityIcon = getIcon('Activity');

  if (state.activity.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
            <ActivityIcon size={14} /> Activity
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Your Activity Timeline</h1>
        </div>
        <EmptyState
          icon={ActivityIcon}
          title="No activity yet"
          description="Your security actions will appear here as you complete scenarios, earn XP, and unlock badges."
        />
      </div>
    );
  }

  const groups: Record<string, ActivityEvent[]> = {};
  for (const event of state.activity) {
    const date = new Date(event.timestamp);
    const key = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
          <ActivityIcon size={14} /> Activity
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Your Activity Timeline</h1>
        <p className="text-sm text-ink-300 mt-1.5">Every decision, score change, and badge unlock — all in one place.</p>
      </div>

      <div className="space-y-6">
        {Object.entries(groups).map(([dayLabel, events]) => (
          <div key={dayLabel}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-wider text-ink-400 font-medium">{dayLabel}</span>
              <div className="flex-1 h-px bg-ink-700/40" />
            </div>
            <div className="relative pl-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink-700/40" />

              <div className="space-y-3">
                {events.map((event) => {
                  const cfg = eventConfig[event.type];
                  const Icon = cfg.icon;
                  const isPositive = event.xp === undefined || event.xp > 0;
                  return (
                    <div key={event.id} className="relative animate-slide-up">
                      <div
                        className="absolute -left-6 top-3.5 w-3.5 h-3.5 rounded-full border-2 border-ink-900 z-10"
                        style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}66` }}
                      />
                      <div className="card-surface p-4 group hover:border-ink-500/30 transition-all">
                        <div className="flex items-start gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${cfg.color}1a`, border: `1px solid ${cfg.color}33` }}
                          >
                            <Icon size={16} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="text-sm font-medium text-white">{event.title}</div>
                              <div className="text-[10px] text-ink-400 shrink-0 mt-0.5">{formatTime(event.timestamp)}</div>
                            </div>
                            <div className="text-xs text-ink-300 mt-0.5">{event.detail}</div>
                            {event.xp !== undefined && event.xp !== 0 && (
                              <div className={`mt-2 inline-flex items-center gap-1 text-xs font-mono font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                                {isPositive ? '+' : ''}{event.xp} XP
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
