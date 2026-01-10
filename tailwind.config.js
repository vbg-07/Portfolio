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
        // Tech-blue palette
        'tech-blue': {
          50: '#e6f9ff',
          100: '#b3efff',
          200: '#80e5ff',
          300: '#4ddbff',
          400: '#1ad1ff',
          500: '#00D4FF', // Primary accent
          600: '#00a8cc',
          700: '#007d99',
          800: '#005266',
          900: '#002733',
        },
        'dark': {
          50: '#1a2332',
          100: '#151c28',
          200: '#101820',
          300: '#0c1218',
          400: '#080d10',
          500: '#040608', // Deepest dark
        },
        'accent': {
          blue: '#00D4FF',
          purple: '#7B61FF',
          green: '#00FF94',
          amber: '#FFB800',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'unfold': 'unfold 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.2)',
          },
        },
        'steam': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-10px) scale(1.1)', opacity: '0.3' },
          '100%': { transform: 'translateY(-20px) scale(1.2)', opacity: '0' },
        },
        'unfold': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'typing': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-blue-lg': '0 0 40px rgba(0, 212, 255, 0.5), 0 0 80px rgba(0, 212, 255, 0.2)',
        'glow-green': '0 0 20px rgba(0, 255, 148, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
        'desk': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'desk-wood': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
        'grid-pattern': `linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)`,
      },
    },
  },
  plugins: [],
}
