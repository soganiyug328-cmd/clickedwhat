import { useEffect, useState } from 'react';
import type { Scenario, ScenarioChoice } from '@/types';
import {
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  AlertTriangle,
  Eye,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { CountUp } from '@/components/ui/CountUp';

interface ScenarioResultProps {
  scenario: Scenario;
  choice: ScenarioChoice;
  onContinue: () => void;
  onRetry: () => void;
}

export function ScenarioResult({ scenario, choice, onContinue, onRetry }: ScenarioResultProps) {
  const [showWarnings, setShowWarnings] = useState(true);
  const [showChain, setShowChain] = useState(true);

  if (choice.correct) {
    return (
      <div className="animate-fade-in space-y-5">
        {/* Success header */}
        <div className="relative overflow-hidden rounded-2xl border border-success/30 bg-gradient-to-br from-success/10 to-transparent p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-success/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-success/15 border border-success/30 flex items-center justify-center animate-scale-in">
                <ShieldCheck size={40} className="text-success" />
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-success/20 animate-pulse-ring" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-success mt-5 tracking-tight">
              GOOD CATCH.
            </h2>
            <p className="text-ink-200 mt-2 max-w-md text-sm">
              You correctly identified the threat. Here is what happened and why your decision was safe.
            </p>
            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-success/10 border border-success/20">
              <TrendingUp size={16} className="text-success" />
              <span className="font-display font-bold text-success text-lg">
                +<CountUp end={choice.xp} duration={800} /> XP
              </span>
            </div>
          </div>
        </div>

        {/* What happened */}
        <ResultSection icon={<CheckCircle2 size={18} className="text-success" />} title="What Happened">
          <p className="text-sm text-ink-200 leading-relaxed">{choice.consequence}</p>
        </ResultSection>

        {/* Warning signs you caught */}
        <ResultSection icon={<Eye size={18} className="text-primary" />} title="Warning Signs You Noticed">
          <div className="space-y-2.5">
            {scenario.warningSigns.map((sign, i) => (
              <div
                key={i}
                className="flex gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-600/20 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{sign.label}</div>
                  <div className="text-xs text-ink-300 mt-0.5">{sign.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </ResultSection>

        {/* Correct action */}
        <ResultSection icon={<Target size={18} className="text-accent" />} title="Correct Action">
          <p className="text-sm text-ink-200 leading-relaxed">{scenario.correctAction}</p>
        </ResultSection>

        {/* Lesson */}
        <ResultSection icon={<Lightbulb size={18} className="text-warn" />} title="Security Lesson">
          <p className="text-sm text-ink-200 leading-relaxed">{scenario.lesson}</p>
        </ResultSection>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="btn-primary flex-1 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Failure header */}
      <div className="relative overflow-hidden rounded-2xl border border-danger/30 bg-gradient-to-br from-danger/10 to-transparent p-6 sm:p-8 animate-shake">
        <div className="absolute top-0 right-0 w-40 h-40 bg-danger/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-danger/15 border border-danger/30 flex items-center justify-center animate-scale-in">
              <ShieldAlert size={40} className="text-danger" />
            </div>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient-danger mt-5 tracking-tight">
            YOU GOT PHISHED.
          </h2>
          <p className="text-ink-200 mt-2 max-w-md text-sm">
            You fell for the attack. Let's break down exactly what happened and the warning signs you missed.
          </p>
          {choice.xp < 0 && (
            <div className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-danger/10 border border-danger/20">
              <TrendingUp size={16} className="text-danger rotate-180" />
              <span className="font-display font-bold text-danger text-lg">
                {choice.xp} XP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* What happened */}
      <ResultSection icon={<XCircle size={18} className="text-danger" />} title="What Happened">
        <p className="text-sm text-ink-200 leading-relaxed">{choice.consequence}</p>
      </ResultSection>

      {/* Attack chain */}
      <div className="rounded-2xl border border-ink-600/20 bg-ink-850/60 overflow-hidden">
        <button
          onClick={() => setShowChain(!showChain)}
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-ink-700/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle size={18} className="text-danger" />
            <span className="font-semibold text-sm text-white">The Attack Chain</span>
          </div>
          {showChain ? <ChevronUp size={16} className="text-ink-300" /> : <ChevronDown size={16} className="text-ink-300" />}
        </button>
        {showChain && (
          <div className="px-5 pb-5 pt-2">
            <div className="space-y-0">
              {scenario.attackChain.map((step, i) => (
                <div key={i} className="flex items-center gap-3 animate-slide-up" style={{ animationDelay: `${i * 120}ms` }}>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold font-mono shrink-0"
                      style={{
                        background: i === scenario.attackChain.length - 1 ? 'rgba(255,92,92,0.15)' : 'rgba(255,92,92,0.08)',
                        border: `1px solid ${i === scenario.attackChain.length - 1 ? 'rgba(255,92,92,0.3)' : 'rgba(255,92,92,0.15)'}`,
                        color: '#ff5c5c',
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < scenario.attackChain.length - 1 && <div className="w-px h-6 bg-danger/20" />}
                  </div>
                  <span className={`text-sm ${i === scenario.attackChain.length - 1 ? 'text-danger font-semibold' : 'text-ink-200'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Warning signs you missed */}
      <div className="rounded-2xl border border-ink-600/20 bg-ink-850/60 overflow-hidden">
        <button
          onClick={() => setShowWarnings(!showWarnings)}
          className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-ink-700/20 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Eye size={18} className="text-warn" />
            <span className="font-semibold text-sm text-white">Warning Signs You Missed</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-warn/15 text-warn font-medium">
              {scenario.warningSigns.length}
            </span>
          </div>
          {showWarnings ? <ChevronUp size={16} className="text-ink-300" /> : <ChevronDown size={16} className="text-ink-300" />}
        </button>
        {showWarnings && (
          <div className="px-5 pb-5 pt-2 space-y-2.5">
            {scenario.warningSigns.map((sign, i) => (
              <div
                key={i}
                className="flex gap-3 p-3.5 rounded-xl bg-ink-800/40 border border-ink-600/20 animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <XCircle size={16} className="text-warn shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-white">{sign.label}</div>
                  <div className="text-xs text-ink-300 mt-0.5">{sign.detail}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Correct action */}
      <ResultSection icon={<Target size={18} className="text-success" />} title="What You Should Have Done">
        <p className="text-sm text-ink-200 leading-relaxed">{scenario.correctAction}</p>
      </ResultSection>

      {/* Lesson */}
      <ResultSection icon={<Lightbulb size={18} className="text-warn" />} title="Security Lesson">
        <p className="text-sm text-ink-200 leading-relaxed">{scenario.lesson}</p>
      </ResultSection>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white border border-ink-600/40 bg-ink-700/40 hover:bg-ink-700/60 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onContinue}
          className="btn-primary flex-1 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          Got it <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ResultSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-600/20 bg-ink-850/60 p-5 animate-slide-up">
      <div className="flex items-center gap-2.5 mb-3">
        {icon}
        <h3 className="font-semibold text-sm text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}
