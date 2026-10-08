import { useApp } from '@/context/AppContext';
import { skillsMeta, threatRadarData } from '@/data/content';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CountUp } from '@/components/ui/CountUp';
import { getIcon } from '@/components/iconRegistry';
import type { Page } from '@/components/navConfig';

const skillColors: Record<string, string> = {
  phishing: '#3dd6c6',
  passwords: '#4d8dff',
  social: '#ffaa33',
  privacy: '#b388ff',
  device: '#3ee08a',
};

export function CommandCenterPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { state, getLevel } = useApp();
  const level = getLevel();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const scoreDiff = state.securityScore - state.prevSecurityScore;
  const strongestSkill = Object.entries(state.skillScores).sort((a, b) => b[1] - a[1])[0];
  const weakestSkill = Object.entries(state.skillScores).sort((a, b) => a[1] - b[1])[0];

  const ShieldCheckIcon = getIcon('ShieldCheck');
  const TrendingUpIcon = getIcon('TrendingUp');
  const TrendingDownIcon = getIcon('TrendingDown');
  const ZapIcon = getIcon('Zap');
  const CrosshairIcon = getIcon('Crosshair');
  const TrophyIcon = getIcon('Trophy');
  const FishIcon = getIcon('Fish');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const BookOpenIcon = getIcon('BookOpen');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ArrowRightIcon = getIcon('ArrowRight');
  const MinusIcon = getIcon('Minus');
  const CheckCircle2Icon = getIcon('CheckCircle2');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="animate-fade-in">
        <p className="text-sm text-ink-300">{greeting}, Defender.</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mt-1">Command Center</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card-surface p-6 lg:col-span-1 flex flex-col items-center animate-slide-up">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-300 mb-4">
            <ShieldCheckIcon size={14} className="text-primary" />
            Digital Security Score
          </div>
          <ScoreGauge score={state.securityScore} size={200} />
          {scoreDiff !== 0 && (
            <div className={`mt-4 flex items-center gap-1.5 text-sm ${scoreDiff > 0 ? 'text-success' : 'text-danger'}`}>
              {scoreDiff > 0 ? <TrendingUpIcon size={14} /> : <TrendingDownIcon size={14} />}
              <span className="font-semibold">
                {scoreDiff > 0 ? '+' : ''}{scoreDiff} this session
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard icon={<ZapIcon size={18} className="text-primary" />} label="Total XP" value={<CountUp end={state.xp} duration={1000} />} subtext={level.name} />
          <StatCard icon={<CrosshairIcon size={18} className="text-accent" />} label="Scenarios" value={<CountUp end={state.completedScenarios.length} duration={800} suffix="/10" />} subtext="Completed" />
          <StatCard icon={<TrophyIcon size={18} className="text-warn" />} label="Badges" value={<CountUp end={state.unlockedBadges.length} duration={800} />} subtext="Unlocked" />
          <StatCard icon={<FishIcon size={18} className="text-success" />} label="Strongest Skill" value={<span className="text-base font-display font-bold text-white">{skillsMeta.find((s) => s.key === strongestSkill[0])?.label.split(' ')[0] ?? '—'}</span>} subtext={`${strongestSkill[1]}/100`} />
          <StatCard icon={<AlertTriangleIcon size={18} className="text-danger" />} label="Weakest Skill" value={<span className="text-base font-display font-bold text-white">{skillsMeta.find((s) => s.key === weakestSkill[0])?.label.split(' ')[0] ?? '—'}</span>} subtext={`${weakestSkill[1]}/100`} />
          <StatCard icon={<BookOpenIcon size={18} className="text-primary" />} label="Lessons" value={<CountUp end={state.completedLessons.length} duration={600} />} subtext="Completed" />
        </div>
      </div>

      <div className="card-surface p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-lg font-semibold text-white">Security Skills</h2>
          <button onClick={() => onNavigate('mysecurity')} className="text-xs text-ink-300 hover:text-primary transition-colors flex items-center gap-1">
            View details <ChevronRightIcon size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {skillsMeta.map((skill) => {
            const IconComp = getIcon(skill.icon);
            const value = state.skillScores[skill.key];
            const color = skillColors[skill.key] ?? '#3dd6c6';
            return (
              <div key={skill.key} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}1a`, border: `1px solid ${color}33` }}>
                  <IconComp size={22} style={{ color }} />
                </div>
                <div className="text-xs text-ink-300 mb-2 font-medium">{skill.label}</div>
                <ProgressBar value={value} color={color} height={5} showValue animate />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="card-surface p-6 animate-slide-up">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-3">
            <CrosshairIcon size={14} /> Ready for Action
          </div>
          <h2 className="font-display text-xl font-bold text-white mb-2">Face a New Threat</h2>
          <p className="text-sm text-ink-300 mb-4">
            Jump into a realistic scenario and test your instincts. Every decision sharpens your security awareness.
          </p>
          <button onClick={() => onNavigate('simulator')} className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center gap-2">
            Open Threat Simulator <ArrowRightIcon size={16} />
          </button>
        </div>

        <div className="card-surface p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">Threat Radar</h2>
            <span className="text-[10px] text-ink-400 uppercase tracking-wider">Educational data</span>
          </div>
          <div className="space-y-3">
            {threatRadarData.map((threat) => (
              <div key={threat.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ink-200 font-medium">{threat.category}</span>
                  <div className="flex items-center gap-1.5">
                    {threat.trend === 'up' && <TrendingUpIcon size={12} className="text-danger" />}
                    {threat.trend === 'stable' && <MinusIcon size={12} className="text-ink-400" />}
                    <span className="font-mono text-ink-300">{threat.value}%</span>
                  </div>
                </div>
                <ProgressBar value={threat.value} color={threat.value > 70 ? '#ff5c5c' : threat.value > 50 ? '#ffaa33' : '#3dd6c6'} height={4} animate />
              </div>
            ))}
          </div>
        </div>
      </div>

      {state.activity.length > 0 && (
        <div className="card-surface p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-white">Recent Activity</h2>
            <button onClick={() => onNavigate('activity')} className="text-xs text-ink-300 hover:text-primary transition-colors flex items-center gap-1">
              View all <ChevronRightIcon size={14} />
            </button>
          </div>
          <div className="space-y-2.5">
            {state.activity.slice(0, 4).map((event) => (
              <div key={event.id} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-lg bg-ink-700/40 border border-ink-600/20 flex items-center justify-center shrink-0">
                  {event.type === 'scenario_complete' && event.xp && event.xp > 0 ? (
                    <CheckCircle2Icon size={14} className="text-success" />
                  ) : event.type === 'scenario_complete' ? (
                    <AlertTriangleIcon size={14} className="text-danger" />
                  ) : event.type === 'score_change' ? (
                    <TrendingUpIcon size={14} className="text-primary" />
                  ) : event.type === 'lesson_complete' ? (
                    <BookOpenIcon size={14} className="text-accent" />
                  ) : (
                    <TrophyIcon size={14} className="text-warn" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white truncate">{event.title}</div>
                  <div className="text-xs text-ink-300">{event.detail}</div>
                </div>
                <div className="text-[10px] text-ink-400 shrink-0">{timeAgo(event.timestamp)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: React.ReactNode; subtext: string }) {
  return (
    <div className="card-surface p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-wider text-ink-300">{label}</span>
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-ink-400 mt-0.5">{subtext}</div>
    </div>
  );
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
