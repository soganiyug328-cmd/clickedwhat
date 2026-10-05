/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070b12',
          900: '#0b1018',
          850: '#0e131d',
          800: '#121826',
          750: '#161d2e',
          700: '#1b2236',
          600: '#252e47',
          500: '#38415f',
          400: '#5a6488',
          300: '#8892b0',
        },
        primary: {
          DEFAULT: '#3dd6c6',
          glow: '#5fffe6',
          deep: '#1a9b8f',
        },
        accent: {
          DEFAULT: '#4d8dff',
          glow: '#7aaeff',
        },
        danger: {
          DEFAULT: '#ff5c5c',
          deep: '#c83232',
        },
        warn: {
          DEFAULT: '#ffaa33',
          deep: '#cc7a00',
        },
        success: {
          DEFAULT: '#3ee08a',
          deep: '#1a9b53',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(61, 214, 198, 0.35)',
        'glow-accent': '0 0 24px -4px rgba(77, 141, 255, 0.35)',
        'glow-danger': '0 0 24px -4px rgba(255, 92, 92, 0.4)',
        card: '0 4px 24px -8px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(88,92,120,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(88,92,120,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        'count-up': {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'blink-dot': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        shake: 'shake 0.5s ease-in-out',
        sweep: 'sweep 4s linear infinite',
        'blink-dot': 'blink-dot 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
