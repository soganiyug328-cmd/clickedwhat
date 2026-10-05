import { useEffect, useState } from 'react';
import { CountUp } from './CountUp';

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export function ScoreGauge({ score, size = 200 }: ScoreGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const strokeWidth = size * 0.06;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = animatedScore / 100;
  const offset = circumference * (1 - percentage);

  const color = score >= 80 ? '#3ee08a' : score >= 60 ? '#3dd6c6' : score >= 40 ? '#ffaa33' : '#ff5c5c';
  const label = score >= 80 ? 'Strong' : score >= 60 ? 'Good' : score >= 40 ? 'At Risk' : 'Critical';

  // Tick marks
  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        {/* Outer tick marks */}
        {ticks.map((i) => {
          const angle = (i / 60) * 360;
          const isActive = (i / 60) <= percentage;
          const x1 = size / 2 + (radius + strokeWidth * 0.7) * Math.cos((angle * Math.PI) / 180);
          const y1 = size / 2 + (radius + strokeWidth * 0.7) * Math.sin((angle * Math.PI) / 180);
          const x2 = size / 2 + (radius + strokeWidth * 1.3) * Math.cos((angle * Math.PI) / 180);
          const y2 = size / 2 + (radius + strokeWidth * 1.3) * Math.sin((angle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isActive ? color : 'rgba(88,100,136,0.12)'}
              strokeWidth={isActive ? 2 : 1}
              strokeLinecap="round"
              style={{
                transition: 'stroke 0.5s ease',
                filter: isActive ? `drop-shadow(0 0 3px ${color}88)` : undefined,
              }}
            />
          );
        })}
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(88,100,136,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1), stroke 0.5s ease',
            filter: `drop-shadow(0 0 8px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <CountUp end={score} duration={1500} className="font-display text-5xl font-bold" />
        <span className="text-xs text-ink-300 mt-0.5">/ 100</span>
        <span
          className="text-[10px] font-semibold uppercase tracking-widest mt-2 px-2 py-0.5 rounded-full"
          style={{ color, background: `${color}1a`, border: `1px solid ${color}33` }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
