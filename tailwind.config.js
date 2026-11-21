/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#A51E2B',
          dark: '#851621',
          light: '#C72A39',
          50: '#FDF2F3',
          100: '#FBE4E6',
        },
        coral: {
          DEFAULT: '#EF6938',
          hover: '#E05523',
          light: '#FDEEE8',
          50: '#FEF5F1',
        },
        offwhite: '#F8F6F2',
        charcoal: '#242321',
        muted: '#85817C',
        sage: {
          DEFAULT: '#E8EFE8',
          dark: '#406343',
          text: '#2C4A2E',
        },
        borderLight: '#E9E3DC',
        surface: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(36, 35, 33, 0.05), 0 1px 2px rgba(36, 35, 33, 0.03)',
        'warm': '0 4px 12px rgba(36, 35, 33, 0.06), 0 1px 3px rgba(36, 35, 33, 0.04)',
        'warm-lg': '0 12px 30px rgba(36, 35, 33, 0.08), 0 4px 8px rgba(36, 35, 33, 0.04)',
        'warm-xl': '0 20px 40px rgba(36, 35, 33, 0.12)',
      },
      borderRadius: {
        'editorial': '4px',
        'subtle': '8px',
        'card': '12px',
      }
    },
  },
  plugins: [],
}
