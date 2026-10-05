import { useState } from 'react';
import { lessons } from '@/data/content';
import { useApp } from '@/context/AppContext';
import * as Icons from 'lucide-react';
import { EmptyState } from '@/components/ui/Feedback';

const categoryIcons: Record<string, string> = {
  phishing: 'Fish',
  url: 'Link',
  bank: 'CreditCard',
  social: 'UserSearch',
  wifi: 'Wifi',
  update: 'RefreshCw',
  qr: 'QrCode',
  file: 'FileText',
  password: 'KeyRound',
  job: 'Briefcase',
};

const skillColors: Record<string, string> = {
  phishing: '#3dd6c6',
  passwords: '#4d8dff',
  social: '#ffaa33',
  privacy: '#b388ff',
  device: '#3ee08a',
};

export function LearningPage() {
  const { state, completeLesson } = useApp();
  const [selectedLesson, setSelectedLesson] = useState<typeof lessons[0] | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  if (selectedLesson) {
    const isCompleted = state.completedLessons.includes(selectedLesson.id);
    const allChecked = checkedItems.size === selectedLesson.checklist.length;
    const canComplete = allChecked || isCompleted;
    const skillColor = skillColors[selectedLesson.skill] ?? '#3dd6c6';

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => {
            setSelectedLesson(null);
            setCheckedItems(new Set());
          }}
          className="flex items-center gap-2 text-sm text-ink-300 hover:text-white transition-colors mb-5"
        >
          <Icons.ArrowLeft size={16} /> Back to lessons
        </button>

        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ color: skillColor, background: `${skillColor}1a`, border: `1px solid ${skillColor}33` }}
            >
              {selectedLesson.duration}
            </div>
            {isCompleted && (
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
                <Icons.CheckCircle2 size={10} /> Completed
              </div>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">{selectedLesson.title}</h1>
          <p className="text-sm text-ink-300 mb-6">{selectedLesson.summary}</p>

          {/* Sections */}
          <div className="space-y-4 mb-8">
            {selectedLesson.sections.map((section, i) => (
              <div
                key={i}
                className="card-surface p-5 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display font-semibold text-white text-base mb-2 flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0"
                    style={{ background: `${skillColor}1a`, color: skillColor, border: `1px solid ${skillColor}33` }}
                  >
                    {i + 1}
                  </span>
                  {section.heading}
                </h3>
                <p className="text-sm text-ink-200 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Interactive checklist */}
          <div className="card-surface p-5 mb-6">
            <h3 className="font-display font-semibold text-white text-base mb-4 flex items-center gap-2">
              <Icons.CheckSquare size={18} className="text-primary" />
              Security Checklist
              <span className="text-xs text-ink-300 font-normal ml-auto">
                {checkedItems.size}/{selectedLesson.checklist.length}
              </span>
            </h3>
            <div className="space-y-2">
              {selectedLesson.checklist.map((item, i) => {
                const checked = checkedItems.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (isCompleted) return;
                      setCheckedItems((prev) => {
                        const next = new Set(prev);
                        if (next.has(i)) next.delete(i);
                        else next.add(i);
                        return next;
                      });
                    }}
                    disabled={isCompleted}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      checked ? 'bg-success/5 border border-success/20' : 'bg-ink-800/30 border border-ink-600/20'
                    } ${isCompleted ? 'opacity-60' : 'hover:bg-ink-750/40'}`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        checked ? 'bg-success border-success' : 'border-ink-500'
                      }`}
                    >
                      {checked && <Icons.Check size={12} className="text-ink-950" strokeWidth={3} />}
                    </div>
                    <span className={`text-sm ${checked ? 'text-white' : 'text-ink-200'}`}>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complete button */}
          {!isCompleted && (
            <button
              onClick={() => {
                if (canComplete) {
                  completeLesson(selectedLesson.id, selectedLesson.skill);
                }
              }}
              disabled={!canComplete}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                canComplete
                  ? 'btn-primary'
                  : 'bg-ink-700/40 text-ink-400 border border-ink-600/20 cursor-not-allowed'
              }`}
            >
              {canComplete ? (
                <>Complete Lesson & Earn XP <Icons.ArrowRight size={16} /></>
              ) : (
                `Check all ${selectedLesson.checklist.length} items to complete`
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary mb-2">
          <Icons.BookOpen size={14} /> Learning Center
        </div>
        <h1 className="font-display text-3xl font-bold text-white">Learn the Fundamentals</h1>
        <p className="text-sm text-ink-300 mt-1.5 max-w-lg">
          Short, interactive lessons that explain why things are dangerous and how to protect yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {lessons.map((lesson, i) => {
          const IconComp = Icons[categoryIcons[lesson.category] as keyof typeof Icons] as Icons.LucideIcon;
          const completed = state.completedLessons.includes(lesson.id);
          const skillColor = skillColors[lesson.skill] ?? '#3dd6c6';
          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="group text-left card-surface p-5 hover:border-ink-500/30 transition-all duration-200 animate-slide-up relative"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {completed && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] uppercase tracking-wider text-success font-medium">
                  <Icons.CheckCircle2 size={12} /> Done
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${skillColor}1a`, border: `1px solid ${skillColor}33` }}
                >
                  <IconComp size={22} style={{ color: skillColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-ink-400 font-medium">{lesson.duration}</span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-base group-hover:text-primary transition-colors mb-1.5 pr-4">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-ink-300 leading-relaxed">{lesson.summary}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <EmptyState
          icon={Icons.BookOpen}
          title="No lessons available"
          description="Lessons will appear here once they are added."
        />
      )}
    </div>
  );
}
