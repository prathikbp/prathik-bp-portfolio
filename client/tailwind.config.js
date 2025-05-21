/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ← enables manual toggle
  theme: {
    extend: {
      colors: {
        accent: '#00C9FF',
        darkOverlay: '#1B1B1B',
        softGray: '#D1D5DB',
        bgLight: '#F9FAFB',
      },
    },
  },
  plugins: [],
};


