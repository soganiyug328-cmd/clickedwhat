import { useState } from 'react';
import { scenarios } from '@/data/scenarios';
import type { Scenario, ScenarioChoice } from '@/types';
import { ScenarioInterface } from '@/components/scenarios/ScenarioInterface';
import { ScenarioResult } from '@/components/scenarios/ScenarioResult';
import { useApp } from '@/context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Crosshair,
  Lock,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
} from 'lucide-react';

const threatLevelConfig = {
  low: { color: '#3ee08a', label: 'Low' },
  medium: { color: '#ffaa33', label: 'Medium' },
  high: { color: '#ff5c5c', label: 'High' },
  critical: { color: '#ff3366', label: 'Critical' },
};

export function ThreatSimulatorPage({ initialScenarioId }: { initialScenarioId?: string }) {
  const { state, completeScenario } = useApp();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    initialScenarioId ? scenarios.find((s) => s.id === initialScenarioId) ?? null : null
  );
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);

  function startScenario(scenario: Scenario) {
    setSelectedScenario(scenario);
    setPhase('playing');
    setSelectedChoice(null);
  }

  function handleChoice(choice: ScenarioChoice) {
    if (!selectedScenario) return;
    setSelectedChoice(choice);
    setPhase('result');
    completeScenario(selectedScenario.id, choice.correct);
  }

  function handleRetry() {
    setPhase('playing');
    setSelectedChoice(null);
  }

  function handleContinue() {
    setSelectedScenario(null);
    setSelectedChoice(null);
    setPhase('intro');
  }

  if (selectedScenario && phase === 'result' && selectedChoice) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <ScenarioResult
          scenario={selectedScenario}
          choice={selectedChoice}
          onContinue={handleContinue}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (selectedScenario && phase === 'playing') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={handleContinue}
          className="flex items-center gap-2 text-sm text-ink-300 hover:text-white transition-colors mb-5"
        >
          <ArrowLeft size={16} /> Back to scenarios
        </button>

        {/* Scenario header */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{
              color: threatLevelConfig[selectedScenario.threatLevel].color,
              background: `${threatLevelConfig[selectedScenario.threatLevel].color}1a`,
              border: `1px solid ${threatLevelConfig[selectedScenario.threatLevel].color}33`,
            }}
          >
            {threatLevelConfig[selectedScenario.threatLevel].label} Threat
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-ink-700/50 text-ink-300 border border-ink-600/30">
            {selectedScenario.difficulty}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Zap size={10} /> {selectedScenario.xpReward} XP
          </div>
        </div>

        <h1 className="font-display text-2xl font-bold text-white mb-1">{selectedScenario.title}</h1>
        <p className="text-sm text-ink-300 mb-5">{selectedScenario.subtitle}</p>

        {/* Scenario interface */}
        <ScenarioInterface scenario={selectedScenario} />

        {/* Prompt */}
        <div className="mt-6 mb-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
            <Crosshair size={14} /> Your Decision
          </div>
          <p className="text-lg font-display font-semibold text-white">{selectedScenario.prompt}</p>
        </div>

        {/* Choices */}
        <div className="space-y-2.5">
          {selectedScenario.choices.map((choice, i) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="w-full text-left p-4 rounded-xl border border-ink-600/30 bg-ink-800/40 hover:bg-ink-750/60 hover:border-primary/30 transition-all duration-200 group animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-ink-700/50 border border-ink-600/30 flex items-center justify-center text-xs font-mono font-semibold text-ink-300 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-colors shrink-0">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white group-hover:text-primary transition-colors">
                    {choice.label}
                  </div>
                  {choice.description && (
                    <div className="text-xs text-ink-300 mt-0.5">{choice.description}</div>
                  )}
                </div>
                <ArrowRight size={16} className="text-ink-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Scenario list
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
          <Crosshair size={14} /> Threat Simulator
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Choose Your Scenario</h1>
        <p className="text-sm text-ink-300 mt-1.5 max-w-lg">
          Each scenario puts you in a realistic digital situation. Make your decision and see what happens next.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {scenarios.map((scenario, i) => {
          const completed = state.scenarioResults[scenario.id];
          const threatCfg = threatLevelConfig[scenario.threatLevel];
          return (
            <button
              key={scenario.id}
              onClick={() => startScenario(scenario)}
              className="group text-left rounded-2xl border border-ink-600/20 bg-ink-850/60 hover:bg-ink-800/60 hover:border-ink-500/30 transition-all duration-200 p-5 animate-slide-up relative overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {completed && (
                <div className="absolute top-3 right-3">
                  {completed.correct ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-danger/50 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-danger/60" />
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: threatCfg.color, boxShadow: `0 0 6px ${threatCfg.color}` }}
                />
                <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: threatCfg.color }}>
                  {threatCfg.label}
                </span>
                <span className="text-[10px] text-ink-400">·</span>
                <span className="text-[10px] text-ink-400">{scenario.difficulty}</span>
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-1 group-hover:text-primary transition-colors pr-6">
                {scenario.title}
              </h3>
              <p className="text-xs text-ink-300 mb-3">{scenario.subtitle}</p>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-ink-400">
                  <Zap size={12} className="text-primary" />
                  <span>{scenario.xpReward} XP</span>
                </div>
                {completed && (
                  <div className="flex items-center gap-1 text-ink-400">
                    <CheckCircle2 size={12} className={completed.correct ? 'text-success' : 'text-danger/60'} />
                    <span>{completed.correct ? 'Completed' : 'Attempted'}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
