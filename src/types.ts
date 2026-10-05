export type ScenarioCategory =
  | 'phishing'
  | 'url'
  | 'bank'
  | 'social'
  | 'wifi'
  | 'update'
  | 'qr'
  | 'file'
  | 'password'
  | 'job';

export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ScenarioChoice {
  id: string;
  label: string;
  description?: string;
  correct: boolean;
  consequence: string;
  /** XP awarded/removed */
  xp: number;
}

export interface ScenarioWarningSign {
  label: string;
  detail: string;
}

export interface Scenario {
  id: string;
  category: ScenarioCategory;
  title: string;
  subtitle: string;
  threatLevel: ThreatLevel;
  difficulty: 'Rookie' | 'Intermediate' | 'Advanced';
  xpReward: number;
  /** The UI variant to render */
  interface: 'email' | 'sms' | 'phone' | 'browser' | 'wifi' | 'update' | 'qr' | 'file' | 'password' | 'job';
  /** Payload for the interface renderer */
  payload: Record<string, string>;
  prompt: string;
  choices: ScenarioChoice[];
  warningSigns: ScenarioWarningSign[];
  correctAction: string;
  lesson: string;
  /** The attack chain shown on failure */
  attackChain: string[];
  skill: SecuritySkill;
}

export type SecuritySkill =
  | 'phishing'
  | 'passwords'
  | 'social'
  | 'privacy'
  | 'device';

export interface SkillMeta {
  key: SecuritySkill;
  label: string;
  icon: string;
}

export interface ActivityEvent {
  id: string;
  type: 'scenario_complete' | 'score_change' | 'badge_unlock' | 'level_up' | 'lesson_complete';
  title: string;
  detail: string;
  timestamp: number;
  category: ScenarioCategory | 'system';
  threatLevel?: ThreatLevel;
  xp?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** condition key — unlocked when condition met */
  condition: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: ScenarioCategory;
  duration: string;
  skill: SecuritySkill;
  summary: string;
  sections: { heading: string; body: string }[];
  checklist: string[];
}

export interface UserState {
  onboarded: boolean;
  xp: number;
  completedScenarios: string[];
  scenarioResults: Record<string, { correct: boolean; date: number }>;
  completedLessons: string[];
  unlockedBadges: string[];
  activity: ActivityEvent[];
  skillScores: Record<SecuritySkill, number>;
  securityScore: number;
  prevSecurityScore: number;
}
