import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ActivityEvent, ScenarioCategory, SecuritySkill, UserState } from '@/types';
import { scenarios } from '@/data/scenarios';
import { badges } from '@/data/content';

const STORAGE_KEY = 'clicked_user_state_v1';

const initialState: UserState = {
  onboarded: false,
  xp: 0,
  completedScenarios: [],
  scenarioResults: {},
  completedLessons: [],
  unlockedBadges: [],
  activity: [],
  skillScores: {
    phishing: 50,
    passwords: 50,
    social: 50,
    privacy: 50,
    device: 50,
  },
  securityScore: 50,
  prevSecurityScore: 50,
};

function loadState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as UserState;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

function computeSecurityScore(skillScores: Record<SecuritySkill, number>): number {
  const values = Object.values(skillScores);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round(Math.min(100, Math.max(0, avg)));
}

function genId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface AppContextValue {
  state: UserState;
  completeScenario: (scenarioId: string, correct: boolean) => void;
  completeLesson: (lessonId: string, skill: SecuritySkill) => void;
  finishOnboarding: () => void;
  resetProgress: () => void;
  getLevel: () => { name: string; minXP: number; icon: string; nextXP: number | null };
  newlyUnlockedBadges: string[];
  clearNewBadges: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>(loadState);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function checkBadges(s: UserState): UserState {
    const unlocked = new Set(s.unlockedBadges);
    const newly: string[] = [];

    const correctBySkill: Record<string, number> = {};
    const correctByCategory: Record<string, number> = {};
    let totalCorrect = 0;

    for (const [sid, result] of Object.entries(s.scenarioResults)) {
      if (!result.correct) continue;
      const scenario = scenarios.find((sc) => sc.id === sid);
      if (!scenario) continue;
      totalCorrect++;
      correctBySkill[scenario.skill] = (correctBySkill[scenario.skill] || 0) + 1;
      correctByCategory[scenario.category] = (correctByCategory[scenario.category] || 0) + 1;
    }

    let streak = 0;
    const sortedResults = Object.entries(s.scenarioResults).sort(
      (a, b) => a[1].date - b[1].date
    );
    for (const [, result] of sortedResults) {
      if (result.correct) {
        streak++;
      } else {
        streak = 0;
      }
    }

    const lessonsCompleted = s.completedLessons.length;

    for (const badge of badges) {
      if (unlocked.has(badge.id)) continue;
      const [type, countStr] = badge.condition.split(':');
      const count = parseInt(countStr, 10);
      let met = false;
      if (type === 'total') met = totalCorrect >= count;
      else if (type === 'streak') met = streak >= count;
      else if (type === 'lessons') met = lessonsCompleted >= count;
      else met = (correctBySkill[type] || 0) >= count;

      if (met) {
        unlocked.add(badge.id);
        newly.push(badge.id);
      }
    }

    if (newly.length > 0) {
      setNewlyUnlocked((prev) => [...prev, ...newly]);
    }

    return { ...s, unlockedBadges: Array.from(unlocked) };
  }

  function completeScenario(scenarioId: string, correct: boolean): void {
    setState((prev) => {
      const scenario = scenarios.find((s) => s.id === scenarioId);
      if (!scenario) return prev;

      const wasAlreadyCorrect = prev.scenarioResults[scenarioId]?.correct;
      const isCorrect = correct;

      const newResults = {
        ...prev.scenarioResults,
        [scenarioId]: { correct: isCorrect, date: Date.now() },
      };

      const completed = prev.completedScenarios.includes(scenarioId)
        ? prev.completedScenarios
        : [...prev.completedScenarios, scenarioId];

      // XP: only award once per scenario; if already completed correctly, no change
      let xpDelta = 0;
      if (!prev.completedScenarios.includes(scenarioId)) {
        xpDelta = isCorrect ? scenario.xpReward : scenario.xpReward > 0 ? -Math.min(20, Math.floor(scenario.xpReward / 2)) : 0;
      } else if (prev.scenarioResults[scenarioId] && !prev.scenarioResults[scenarioId].correct && isCorrect) {
        // improved from wrong to right
        xpDelta = Math.floor(scenario.xpReward / 2);
      }

      const newXp = Math.max(0, prev.xp + xpDelta);

      // Update skill scores
      const skillScores = { ...prev.skillScores };
      if (isCorrect) {
        skillScores[scenario.skill] = Math.min(100, skillScores[scenario.skill] + 8);
      } else {
        skillScores[scenario.skill] = Math.max(0, skillScores[scenario.skill] - 5);
      }

      const prevScore = computeSecurityScore(prev.skillScores);
      const newScore = computeSecurityScore(skillScores);

      const event: ActivityEvent = {
        id: genId(),
        type: isCorrect ? 'scenario_complete' : 'scenario_complete',
        title: isCorrect
          ? `Detected threat: ${scenario.title}`
          : `Fell for: ${scenario.title}`,
        detail: isCorrect
          ? `Correctly handled a ${scenario.threatLevel} threat scenario`
          : `Missed the warning signs in a ${scenario.threatLevel} threat scenario`,
        timestamp: Date.now(),
        category: scenario.category,
        threatLevel: scenario.threatLevel,
        xp: xpDelta,
      };

      const scoreEvent: ActivityEvent | null =
        newScore !== prevScore
          ? {
              id: genId(),
              type: 'score_change',
              title: `Security score ${newScore > prevScore ? 'increased' : 'adjusted'} to ${newScore}`,
              detail: `${prevScore} → ${newScore}`,
              timestamp: Date.now() + 1,
              category: 'system',
            }
          : null;

      const activity = [event, scoreEvent, ...prev.activity].filter(Boolean).slice(0, 50) as ActivityEvent[];

      const updated: UserState = {
        ...prev,
        xp: newXp,
        completedScenarios: completed,
        scenarioResults: newResults,
        skillScores,
        securityScore: newScore,
        prevSecurityScore: prevScore,
        activity,
      };

      return checkBadges(updated);
    });
  }

  function completeLesson(lessonId: string, skill: SecuritySkill): void {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const completed = [...prev.completedLessons, lessonId];
      const skillScores = { ...prev.skillScores };
      skillScores[skill] = Math.min(100, skillScores[skill] + 5);

      const prevScore = computeSecurityScore(prev.skillScores);
      const newScore = computeSecurityScore(skillScores);

      const event: ActivityEvent = {
        id: genId(),
        type: 'lesson_complete',
        title: `Completed lesson`,
        detail: `Studied a ${skill} lesson`,
        timestamp: Date.now(),
        category: 'system',
        xp: 15,
      };

      const scoreEvent: ActivityEvent = {
        id: genId(),
        type: 'score_change',
        title: `Security score increased to ${newScore}`,
        detail: `${prevScore} → ${newScore}`,
        timestamp: Date.now() + 1,
        category: 'system',
      };

      const activity = [event, newScore !== prevScore ? scoreEvent : null, ...prev.activity].filter(Boolean).slice(0, 50) as ActivityEvent[];

      const updated: UserState = {
        ...prev,
        xp: prev.xp + 15,
        completedLessons: completed,
        skillScores,
        securityScore: newScore,
        prevSecurityScore: prevScore,
        activity,
      };

      return checkBadges(updated);
    });
  }

  function finishOnboarding(): void {
    setState((prev) => ({ ...prev, onboarded: true }));
  }

  function resetProgress(): void {
    setState({ ...initialState, onboarded: true });
    setNewlyUnlocked([]);
  }

  function getLevel() {
    const levels = [
      { name: 'Rookie', minXP: 0, icon: 'Sprout', nextXP: 150 },
      { name: 'Defender', minXP: 150, icon: 'Shield', nextXP: 400 },
      { name: 'Analyst', minXP: 400, icon: 'Search', nextXP: 800 },
      { name: 'Hunter', minXP: 800, icon: 'Crosshair', nextXP: 1400 },
      { name: 'Guardian', minXP: 1400, icon: 'Crown', nextXP: null },
    ];
    let current = levels[0];
    for (const lvl of levels) {
      if (state.xp >= lvl.minXP) current = lvl;
    }
    return current;
  }

  const value: AppContextValue = useMemo(
    () => ({
      state,
      completeScenario,
      completeLesson,
      finishOnboarding,
      resetProgress,
      getLevel,
      newlyUnlockedBadges: newlyUnlocked,
      clearNewBadges: () => setNewlyUnlocked([]),
    }),
    [state, newlyUnlocked]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
