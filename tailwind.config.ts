import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sydney-inspired color palette
        sydney: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Facility type colors
        facility: {
          park: '#10b981',
          sports: '#3b82f6',
          recreation: '#8b5cf6',
          fitness: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    // Custom plugin for facility-specific utilities
    function({ addUtilities }: any) {
      const newUtilities = {
        '.facility-card': {
          '@apply bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200': {},
        },
        '.facility-card-hover': {
          '@apply hover:shadow-lg hover:border-sydney-300 transition-all duration-200': {},
        },
        '.search-input': {
          '@apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sydney-500 focus:border-sydney-500 transition-colors': {},
        },
        '.btn-primary': {
          '@apply bg-sydney-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sydney-700 focus:ring-2 focus:ring-sydney-500 focus:ring-offset-2 transition-colors': {},
        },
        '.btn-secondary': {
          '@apply bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-sydney-500 focus:ring-offset-2 transition-colors': {},
        },
        '.map-marker': {
          '@apply w-8 h-8 bg-sydney-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg': {},
        },
        '.loading-skeleton': {
          '@apply animate-pulse bg-gray-200 rounded': {},
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;

