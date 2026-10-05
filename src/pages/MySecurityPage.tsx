import { useApp } from '@/context/AppContext';
import { skillsMeta } from '@/data/content';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import * as Icons from 'lucide-react';
import type { Page } from '@/components/navConfig';
import { scenarios } from '@/data/scenarios';

const skillColors: Record<string, string> = {
  phishing: '#3dd6c6',
  passwords: '#4d8dff',
  social: '#ffaa33',
  privacy: '#b388ff',
  device: '#3ee08a',
};

export function MySecurityPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { state, resetProgress } = useApp();

  const sorted = Object.entries(state.skillScores).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];
  const scoreDiff = state.securityScore - state.prevSecurityScore;

  const completedCount = state.completedScenarios.length;
  const correctCount = Object.values(state.scenarioResults).filter((r) => r.correct).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
          <Icons.Shield size={14} /> My Security
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Your Security Profile</h1>
        <p className="text-sm text-ink-300 mt-1.5">A complete breakdown of your cybersecurity strengths and areas to improve.</p>
      </div>

      {/* Score overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card-surface p-6 flex flex-col items-center justify-center animate-slide-up">
          <div className="text-xs uppercase tracking-wider text-ink-300 mb-4">Current Score</div>
          <ScoreGauge score={state.securityScore} size={180} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="card-surface p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-ink-300">Score History</span>
              <div className={`flex items-center gap-1.5 text-sm font-semibold ${scoreDiff > 0 ? 'text-success' : scoreDiff < 0 ? 'text-danger' : 'text-ink-300'}`}>
                {scoreDiff !== 0 && (scoreDiff > 0 ? <Icons.TrendingUp size={14} /> : <Icons.TrendingDown size={14} />)}
                <span>{state.prevSecurityScore} → {state.securityScore}</span>
                {scoreDiff !== 0 && <span className="text-xs">({scoreDiff > 0 ? '+' : ''}{scoreDiff})</span>}
              </div>
            </div>
            <p className="text-sm text-ink-200">
              {scoreDiff > 0
                ? 'Your security awareness is improving. Keep practicing to push your score higher.'
                : scoreDiff < 0
                ? 'Your score dipped slightly. Complete a scenario correctly to recover.'
                : 'Complete scenarios and lessons to improve your score.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icons.TrendingUp size={16} className="text-success" />
                <span className="text-[10px] uppercase tracking-wider text-ink-300">Strongest Skill</span>
              </div>
              <div className="font-display text-xl font-bold text-white">
                {skillsMeta.find((s) => s.key === strongest[0])?.label ?? '—'}
              </div>
              <div className="text-sm text-success font-mono mt-1">{strongest[1]}/100</div>
            </div>
            <div className="card-surface p-5">
              <div className="flex items-center gap-2 mb-2">
                <Icons.AlertTriangle size={16} className="text-warn" />
                <span className="text-[10px] uppercase tracking-wider text-ink-300">Needs Work</span>
              </div>
              <div className="font-display text-xl font-bold text-white">
                {skillsMeta.find((s) => s.key === weakest[0])?.label ?? '—'}
              </div>
              <div className="text-sm text-warn font-mono mt-1">{weakest[1]}/100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill breakdown */}
      <div className="card-surface p-6 animate-slide-up">
        <h2 className="font-display text-lg font-semibold text-white mb-5">Skill Breakdown</h2>
        <div className="space-y-5">
          {skillsMeta.map((skill) => {
            const IconComp = Icons[skill.icon as keyof typeof Icons] as Icons.LucideIcon;
            const value = state.skillScores[skill.key];
            const color = skillColors[skill.key] ?? '#3dd6c6';
            const skillScenarios = scenarios.filter((s) => s.skill === skill.key);
            const completedInSkill = skillScenarios.filter((s) => state.scenarioResults[s.id]?.correct).length;
            return (
              <div key={skill.key}>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}1a`, border: `1px solid ${color}33` }}
                  >
                    <IconComp size={18} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{skill.label}</span>
                      <span className="text-xs font-mono text-ink-300">{completedInSkill}/{skillScenarios.length} scenarios mastered</span>
                    </div>
                  </div>
                </div>
                <ProgressBar value={value} color={color} height={6} showValue animate />
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-surface p-4 text-center">
          <Icons.Crosshair size={20} className="text-accent mx-auto mb-2" />
          <div className="font-display text-2xl font-bold text-white">{completedCount}</div>
          <div className="text-xs text-ink-300">Scenarios Tried</div>
        </div>
        <div className="card-surface p-4 text-center">
          <Icons.CheckCircle2 size={20} className="text-success mx-auto mb-2" />
          <div className="font-display text-2xl font-bold text-white">{correctCount}</div>
          <div className="text-xs text-ink-300">Correct Decisions</div>
        </div>
        <div className="card-surface p-4 text-center">
          <Icons.BookOpen size={20} className="text-primary mx-auto mb-2" />
          <div className="font-display text-2xl font-bold text-white">{state.completedLessons.length}</div>
          <div className="text-xs text-ink-300">Lessons Done</div>
        </div>
        <div className="card-surface p-4 text-center">
          <Icons.Trophy size={20} className="text-warn mx-auto mb-2" />
          <div className="font-display text-2xl font-bold text-white">{state.unlockedBadges.length}</div>
          <div className="text-xs text-ink-300">Badges Earned</div>
        </div>
      </div>

      {/* CTA + Reset */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <button
          onClick={() => onNavigate('simulator')}
          className="btn-primary px-6 py-3 rounded-xl text-sm flex items-center gap-2"
        >
          Improve Your Score <Icons.ArrowRight size={16} />
        </button>
        <button
          onClick={() => {
            if (confirm('Reset all progress? This will clear your score, XP, badges, and activity history.')) {
              resetProgress();
            }
          }}
          className="text-xs text-ink-400 hover:text-danger transition-colors flex items-center gap-1.5"
        >
          <Icons.RotateCcw size={12} /> Reset all progress
        </button>
      </div>
    </div>
  );
}
