import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Love Edify Brand Colors
        forest: {
          DEFAULT: '#184D47',
          50: '#E8F4F3',
          100: '#C5E4E2',
          200: '#8EC9C5',
          300: '#57AEA9',
          400: '#2E7A75',
          500: '#184D47',
          600: '#133D38',
          700: '#0E2D2A',
          800: '#091E1C',
          900: '#040F0E',
        },
        golden: {
          DEFAULT: '#F4A621',
          50: '#FEF6E6',
          100: '#FDE9BF',
          200: '#FBCF7A',
          300: '#FFD56B',
          400: '#F4B840',
          500: '#F4A621',
          600: '#D08B0E',
          700: '#A66D09',
          800: '#7C5106',
          900: '#523603',
        },
        cream: {
          DEFAULT: '#FFFDF7',
          50: '#FFFDF7',
          100: '#F2E9DC',
        },
        sage: {
          DEFAULT: '#7BAE7F',
          100: '#E8F3E9',
          200: '#C5DEC7',
          300: '#A1C9A4',
          400: '#7BAE7F',
          500: '#5E9663',
        },
        charcoal: '#2B2B2B',
        'muted-gray': '#6E6E6E',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 2px 20px rgba(24, 77, 71, 0.08)',
        card: '0 4px 24px rgba(24, 77, 71, 0.10)',
        'card-hover': '0 8px 40px rgba(24, 77, 71, 0.16)',
        golden: '0 4px 20px rgba(244, 166, 33, 0.25)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
