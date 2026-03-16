/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000099',
        'background-light': '#f0f4ff',
        'background-dark': '#0a0a1a',
      },
      fontFamily: {
        display: ['Public Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(0,0,153,0.35)',
        'glow-sm': '0 0 12px -2px rgba(0,0,153,0.22)',
        'glow-lg': '0 0 40px -8px rgba(0,0,153,0.45)',
        card: '0 2px 20px -4px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 36px -8px rgba(0,0,0,0.18)',
        float: '0 20px 60px -12px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up-1': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s both',
        'slide-up-2': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.16s both',
        'slide-up-3': 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.24s both',
        'scale-in': 'scaleIn 0.35s ease-out both',
        'bounce-in': 'bounceIn 0.6s ease-out both',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '55%': { opacity: '1', transform: 'scale(1.04)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
