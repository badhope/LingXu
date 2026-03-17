/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss: {
          DEFAULT: '#0A0A0F',
          dark: '#050508',
          light: '#12121A'
        },
        night: {
          DEFAULT: '#0D1117',
          dark: '#080B0F',
          light: '#161B22'
        },
        jade: {
          DEFAULT: '#1A1A2E',
          dark: '#0F0F1A',
          light: '#252540'
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8860B',
          light: '#FFD700',
          muted: '#8B7355'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C0C0C0',
          muted: '#6B7280',
          gold: '#F5E6C8'
        },
        fortune: {
          lucky: '#DC2626',
          warning: '#F59E0B',
          peace: '#10B981',
          mystery: '#8B5CF6'
        }
      },
      fontFamily: {
        'title': ['"Ma Shan Zheng"', 'cursive'],
        'serif': ['"Noto Serif SC"', 'serif'],
        'sans': ['"Noto Sans SC"', 'sans-serif'],
        'number': ['Cinzel', 'serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        'h1': ['48px', { lineHeight: '1.3' }],
        'h2': ['36px', { lineHeight: '1.4' }],
        'h3': ['28px', { lineHeight: '1.4' }],
        'h4': ['22px', { lineHeight: '1.5' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
        'date': ['64px', { lineHeight: '1' }],
        'number': ['24px', { lineHeight: '1' }]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(90deg, #B8860B 0%, #FFD700 50%, #D4AF37 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(26, 26, 46, 0.8) 0%, rgba(13, 17, 23, 0.9) 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)'
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'inner-gold': 'inset 0 0 20px rgba(212, 175, 55, 0.1)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.4)'
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' }
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }
        }
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms'
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ceremony': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [],
}
