export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      spacing: {
        '34': '8.5rem',
        '45': '11.25rem',
      },
      colors: {
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        DMsans: ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        publicSans: ["Public Sans", "sans-serif"]
      },
    },
  },
  plugins: [],
}