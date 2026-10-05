import { useApp } from '@/context/AppContext';
import { badges, levels } from '@/data/content';
import { CountUp } from '@/components/ui/CountUp';
import { ProgressBar } from '@/components/ui/ProgressBar';
import * as Icons from 'lucide-react';
import type { Page } from '@/components/navConfig';

const skillColors: Record<string, string> = {
  phishing: '#3dd6c6',
  passwords: '#4d8dff',
  social: '#ffaa33',
  privacy: '#b388ff',
  device: '#3ee08a',
};

export function SecurityIQPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { state, getLevel } = useApp();
  const level = getLevel();
  const levelIdx = levels.findIndex((l) => l.name === level.name);
  const nextLevel = levels[levelIdx + 1];
  const progressPct = nextLevel
    ? ((state.xp - level.minXP) / (nextLevel.minXP - level.minXP)) * 100
    : 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
          <Icons.Brain size={14} /> Security IQ
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Your Security Identity</h1>
        <p className="text-sm text-ink-300 mt-1.5">Earn XP, level up, and unlock badges by mastering cybersecurity.</p>
      </div>

      {/* Level + XP */}
      <div className="card-surface p-6 animate-slide-up">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
              {(() => {
                const IconComp = Icons[level.icon as keyof typeof Icons] as Icons.LucideIcon;
                return <IconComp size={36} className="text-primary" />;
              })()}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="text-xs uppercase tracking-wider text-ink-300 mb-1">Current Level</div>
            <div className="flex items-baseline gap-3 mb-3">
              <h2 className="font-display text-2xl font-bold text-white">{level.name}</h2>
              <span className="text-sm font-mono text-primary">
                <CountUp end={state.xp} duration={1000} /> XP
              </span>
            </div>
            <ProgressBar value={progressPct} color="#3dd6c6" height={8} animate />
            <div className="flex items-center justify-between mt-2 text-xs text-ink-300">
              <span>{level.name}</span>
              {nextLevel ? <span>{nextLevel.name} at {nextLevel.minXP} XP</span> : <span className="text-success">Max level reached</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Level path */}
      <div className="card-surface p-6 animate-slide-up">
        <h2 className="font-display text-lg font-semibold text-white mb-5">Level Progression</h2>
        <div className="grid grid-cols-5 gap-2 sm:gap-4">
          {levels.map((lvl, i) => {
            const unlocked = state.xp >= lvl.minXP;
            const isCurrent = lvl.name === level.name;
            const IconComp = Icons[lvl.icon as keyof typeof Icons] as Icons.LucideIcon;
            return (
              <div key={lvl.name} className="flex flex-col items-center text-center">
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all ${
                    isCurrent ? 'ring-2 ring-primary ring-offset-2 ring-offset-ink-900' : ''
                  }`}
                  style={{
                    background: unlocked ? 'rgba(61,214,198,0.15)' : 'rgba(88,100,136,0.08)',
                    border: `1px solid ${unlocked ? 'rgba(61,214,198,0.3)' : 'rgba(88,100,136,0.15)'}`,
                  }}
                >
                  <IconComp
                    size={22}
                    className={unlocked ? 'text-primary' : 'text-ink-500'}
                  />
                  {unlocked && !isCurrent && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-ink-900 flex items-center justify-center">
                      <Icons.Check size={8} className="text-ink-950" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className={`text-[10px] sm:text-xs mt-2 font-medium ${unlocked ? 'text-white' : 'text-ink-400'}`}>
                  {lvl.name}
                </div>
                <div className="text-[9px] text-ink-400 font-mono mt-0.5 hidden sm:block">{lvl.minXP} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="card-surface p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold text-white">Badges</h2>
          <span className="text-xs text-ink-300">
            <CountUp end={state.unlockedBadges.length} duration={600} /> / {badges.length} unlocked
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const unlocked = state.unlockedBadges.includes(badge.id);
            const IconComp = Icons[badge.icon as keyof typeof Icons] as Icons.LucideIcon;
            return (
              <div
                key={badge.id}
                className={`relative rounded-xl p-4 text-center transition-all ${
                  unlocked
                    ? 'bg-gradient-to-br from-primary/10 to-transparent border border-primary/20'
                    : 'bg-ink-800/30 border border-ink-600/15'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                    unlocked ? '' : 'grayscale opacity-30'
                  }`}
                  style={{
                    background: unlocked ? 'rgba(61,214,198,0.15)' : 'rgba(88,100,136,0.1)',
                    border: `1px solid ${unlocked ? 'rgba(61,214,198,0.3)' : 'rgba(88,100,136,0.1)'}`,
                  }}
                >
                  <IconComp size={24} className={unlocked ? 'text-primary' : 'text-ink-500'} />
                </div>
                <div className={`text-sm font-semibold ${unlocked ? 'text-white' : 'text-ink-400'}`}>
                  {badge.name}
                </div>
                <div className={`text-[10px] mt-1 ${unlocked ? 'text-ink-300' : 'text-ink-500'}`}>
                  {unlocked ? badge.description : 'Locked'}
                </div>
                {!unlocked && (
                  <div className="absolute top-3 right-3">
                    <Icons.Lock size={12} className="text-ink-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="card-surface p-6 flex flex-col sm:flex-row items-center gap-4 justify-between animate-slide-up">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Want more XP?</h3>
          <p className="text-sm text-ink-300 mt-1">Complete threat scenarios to earn XP and unlock new badges.</p>
        </div>
        <button
          onClick={() => onNavigate('simulator')}
          className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center gap-2 whitespace-nowrap"
        >
          Start a Scenario <Icons.ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
