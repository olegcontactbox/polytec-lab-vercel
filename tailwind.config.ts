import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        body: ['var(--font-crimson)', 'serif'],
      },
      colors: {
        // Warm phosphor amber palette
        glow: '#f97316', // orange-500 — the main accent
      },
      screens: {
        sm: '420px',
      },
    },
  },
  plugins: [],
}

export default config
