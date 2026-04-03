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
        display: ['var(--font-pjs)', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
        body:    ['var(--font-inter)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#050505',
          2: '#0D0D0D',
          3: '#161616',
          4: '#1C1C1C',
        },
        border: {
          DEFAULT: '#222222',
          subtle: '#1A1A1A',
          strong: '#333333',
        },
        brand: {
          DEFAULT: '#FF5C1A',
          2:       '#FF9F4A',
          3:       '#FFD580',
          hover:   '#FF7A42',
          muted:   'rgba(255,92,26,0.10)',
          glow:    'rgba(255,92,26,0.06)',
        },
        text: {
          primary:   '#FFFFFF',
          secondary: '#B8B8B8',
          muted:     '#888888',
          ghost:     '#666666',
        },
        success: { DEFAULT: '#22C55E' },
      },
      borderRadius: {
        btn:   '10px',
        card:  '12px',
        large: '16px',
      },
      maxWidth: {
        content: '1152px',
      },
      boxShadow: {
        'brand-sm': '0 4px 12px rgba(255,92,26,0.2), 0 2px 0 rgba(100,25,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
        'brand-md': '0 8px 28px rgba(255,92,26,0.45), 0 3px 0 rgba(100,25,0,0.7), inset 0 1px 0 rgba(255,255,255,0.28)',
        'brand-lg': '0 16px 48px rgba(255,92,26,0.6), 0 4px 0 rgba(100,25,0,0.8), inset 0 1px 0 rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
}

export default config
