/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#070b14',
          800: '#0d1322',
          700: '#151d34',
          600: '#1e294b',
          accent: '#38bdf8',
          danger: '#ef4444',
          warning: '#f59e0b',
          success: '#10b981',
          purple: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-red': '0 0 25px rgba(239, 68, 68, 0.35)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.35)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.35)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.35)',
      }
    },
  },
  plugins: [],
}
