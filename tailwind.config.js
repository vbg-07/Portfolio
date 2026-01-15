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
                // Monochrome palette replacing Tech-blue
                'tech-blue': {
                    50: '#f8f9fa',
                    100: '#f1f3f5',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd', // Primary accent (formerly bright blue)
                    600: '#868e96',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                },
                'dark': {
                    50: '#1a1a1a',
                    100: '#171717',
                    200: '#141414',
                    300: '#0a0a0a',
                    400: '#050505',
                    500: '#000000', // Deepest dark
                },
                // Light theme colors (inverted for light mode)
                'light': {
                    50: '#f8f9fa',
                    100: '#f1f3f5',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#ffffff', // Brightest light
                },
                'accent': {
                    blue: '#e9ecef',   // Was #00D4FF
                    purple: '#ced4da', // Was #7B61FF
                    green: '#dee2e6',  // Was #00FF94
                    amber: '#adb5bd',  // Was #FFB800
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
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05)',
                    },
                    '50%': {
                        boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), 0 0 60px rgba(255, 255, 255, 0.1)',
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
                'glow-blue': '0 0 20px rgba(255, 255, 255, 0.1)',
                'glow-blue-lg': '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.05)',
                'glow-green': '0 0 20px rgba(255, 255, 255, 0.15)',
                'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
                'desk': '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'desk-wood': 'linear-gradient(135deg, #0a0a0a 0%, #050505 50%, #000000 100%)',
                'grid-pattern': `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
            },
        },
    },
    plugins: [],
}
