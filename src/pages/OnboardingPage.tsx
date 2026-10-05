import { useState } from 'react';
import { Shield, Crosshair, Zap, ArrowRight, Brain, Trophy } from 'lucide-react';
import { scenarios } from '@/data/scenarios';
import { ScenarioInterface } from '@/components/scenarios/ScenarioInterface';
import { ScenarioResult } from '@/components/scenarios/ScenarioResult';
import { useApp } from '@/context/AppContext';
import type { ScenarioChoice } from '@/types';

type Phase = 'intro' | 'briefing' | 'scenario' | 'result' | 'complete';

export function OnboardingPage() {
  const { completeScenario, finishOnboarding, state } = useApp();
  const [phase, setPhase] = useState<Phase>('intro');
  const [choice, setChoice] = useState<ScenarioChoice | null>(null);

  const firstScenario = scenarios[0];

  function handleChoice(c: ScenarioChoice) {
    setChoice(c);
    setPhase('result');
    completeScenario(firstScenario.id, c.correct);
  }

  if (phase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint bg-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-lg text-center animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
              <Shield size={40} className="text-ink-950" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-pulse-ring" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight mb-2">
            <span className="text-gradient">CLICKED.</span>
          </h1>
          <p className="font-display text-lg text-ink-200 mb-1">One click can change everything.</p>
          <p className="text-sm text-ink-300 max-w-sm mx-auto mb-8">
            An interactive cybersecurity awareness platform that puts you inside realistic threats.
            Learn by doing — not by reading a textbook.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { icon: Crosshair, label: 'Threat Simulator' },
              { icon: Brain, label: 'Security IQ' },
              { icon: Trophy, label: 'Earn Badges' },
            ].map((item, i) => (
              <div
                key={i}
                className="card-surface p-3 flex flex-col items-center gap-1.5 animate-slide-up"
                style={{ animationDelay: `${i * 100 + 200}ms` }}
              >
                <item.icon size={20} className="text-primary" />
                <span className="text-[10px] text-ink-300 font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase('briefing')}
            className="btn-primary px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 mx-auto"
          >
            Begin Training <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'briefing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
            <Crosshair size={28} className="text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Let's see how good your digital instincts really are.
          </h2>
          <p className="text-sm text-ink-300 mb-6 max-w-md mx-auto">
            You are about to face your first threat scenario. You will see a realistic situation
            and have to decide what to do. There are no penalties for getting it wrong —
            this is how you learn.
          </p>
          <div className="card-surface p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-primary" />
              <span className="text-xs uppercase tracking-wider text-ink-300">First Mission</span>
            </div>
            <p className="text-sm font-medium text-white">{firstScenario.title}</p>
            <p className="text-xs text-ink-300 mt-0.5">{firstScenario.subtitle}</p>
          </div>
          <button
            onClick={() => setPhase('scenario')}
            className="btn-primary px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 mx-auto"
          >
            Start Scenario <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'scenario') {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-3">
            <Crosshair size={14} /> First Scenario
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">{firstScenario.title}</h1>
          <p className="text-sm text-ink-300 mb-5">{firstScenario.subtitle}</p>

          <ScenarioInterface scenario={firstScenario} />

          <div className="mt-6 mb-4">
            <p className="text-lg font-display font-semibold text-white">{firstScenario.prompt}</p>
          </div>

          <div className="space-y-2.5">
            {firstScenario.choices.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleChoice(c)}
                className="w-full text-left p-4 rounded-xl border border-ink-600/30 bg-ink-800/40 hover:bg-ink-750/60 hover:border-primary/30 transition-all duration-200 group animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-ink-700/50 border border-ink-600/30 flex items-center justify-center text-xs font-mono font-semibold text-ink-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">{c.label}</div>
                    {c.description && <div className="text-xs text-ink-300 mt-0.5">{c.description}</div>}
                  </div>
                  <ArrowRight size={16} className="text-ink-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result' && choice) {
    return (
      <div className="min-h-screen px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <ScenarioResult
            scenario={firstScenario}
            choice={choice}
            onRetry={() => {
              setChoice(null);
              setPhase('scenario');
            }}
            onContinue={() => setPhase('complete')}
          />
        </div>
      </div>
    );
  }

  // Complete
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow mx-auto mb-5">
          <Trophy size={36} className="text-ink-950" strokeWidth={2} />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-2">Welcome, Defender.</h2>
        <p className="text-sm text-ink-300 mb-6 max-w-md mx-auto">
          You have completed your first scenario. Your Security IQ has been initialized.
          Explore the Command Center to see your score, or jump into more scenarios.
        </p>

        <div className="card-surface p-5 mb-6">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-primary">{state.xp}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-300">Starting XP</div>
            </div>
            <div className="w-px h-10 bg-ink-600/30" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-white">{state.securityScore}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-300">Security Score</div>
            </div>
            <div className="w-px h-10 bg-ink-600/30" />
            <div className="text-center">
              <div className="font-display text-2xl font-bold text-accent">Rookie</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-300">Level</div>
            </div>
          </div>
        </div>

        <button
          onClick={finishOnboarding}
          className="btn-primary px-8 py-4 rounded-xl text-sm flex items-center justify-center gap-2 mx-auto"
        >
          Enter Command Center <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
