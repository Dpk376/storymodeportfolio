import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'data-black': '#050810',
        'electric-blue': '#00D4FF',
        'terminal-green': '#00FF88',
        'alert-amber': '#FF9500',
        'incident-red': '#FF3B3B',
        'clean-white': '#F0F4FF',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'Courier New', 'monospace'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px #00D4FF, 0 0 16px #00D4FF40' },
          '50%': { boxShadow: '0 0 16px #00D4FF, 0 0 32px #00D4FF60' },
        },
      },
    },
  },
  plugins: [],
}

export default config
