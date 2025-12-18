/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aegen-pink': '#FFB5EB',
        'teto-blue': '#AFC3FF',
        'bg-light': '#FFFFFF',
        'bg-gradient-start': '#FDF2FA',
        'bg-gradient-end': '#F2F5FE',
      },
      fontFamily: {
        ownglyph: ['Ownglyph', 'sans-serif'],
        pretendard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}