import { LayoutDashboard, Crosshair, Brain, BookOpen, Shield, Activity } from 'lucide-react';

export type Page = 'command' | 'simulator' | 'iq' | 'learning' | 'mysecurity' | 'activity';

export const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'command', label: 'Command Center', icon: LayoutDashboard },
  { id: 'simulator', label: 'Threat Simulator', icon: Crosshair },
  { id: 'iq', label: 'Security IQ', icon: Brain },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'mysecurity', label: 'My Security', icon: Shield },
  { id: 'activity', label: 'Activity', icon: Activity },
];
