import { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import type { Page } from '@/components/navConfig';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { CommandCenterPage } from '@/pages/CommandCenterPage';
import { ThreatSimulatorPage } from '@/pages/ThreatSimulatorPage';
import { SecurityIQPage } from '@/pages/SecurityIQPage';
import { LearningPage } from '@/pages/LearningPage';
import { MySecurityPage } from '@/pages/MySecurityPage';
import { ActivityPage } from '@/pages/ActivityPage';

function AppContent() {
  const { state } = useApp();
  const [page, setPage] = useState<Page>('command');

  if (!state.onboarded) {
    return <OnboardingPage />;
  }

  return (
    <div className="min-h-screen flex bg-ink-950 relative">
      {/* Ambient background */}
      <div className="fixed inset-0 bg-grid-faint bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Sidebar current={page} onNavigate={setPage} />

      <div className="flex-1 min-w-0 relative">
        <MobileNav current={page} onNavigate={setPage} />
        <main className="pb-20 lg:pb-6 min-h-screen">
          {page === 'command' && <CommandCenterPage onNavigate={setPage} />}
          {page === 'simulator' && <ThreatSimulatorPage />}
          {page === 'iq' && <SecurityIQPage onNavigate={setPage} />}
          {page === 'learning' && <LearningPage />}
          {page === 'mysecurity' && <MySecurityPage onNavigate={setPage} />}
          {page === 'activity' && <ActivityPage />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
