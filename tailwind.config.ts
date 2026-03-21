import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        slate: '#4b5563',
        sand: '#f4eee2',
        brass: '#b98a2f',
        navy: '#0b1d37',
        mist: '#eff3f8',
      },
      boxShadow: {
        panel: '0 28px 80px rgba(9, 18, 32, 0.16)',
      },
      backgroundImage: {
        'assessment-radial':
          'radial-gradient(circle at top left, rgba(185, 138, 47, 0.24), transparent 28%), radial-gradient(circle at right center, rgba(14, 37, 66, 0.18), transparent 24%)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
