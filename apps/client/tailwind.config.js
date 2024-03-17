/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      animation: {
        wink: "wink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        wink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      colors: {
        'custom-pink': "#e879f9",
        'custom-pink-600': "#d379f9"
      }
    },
  },
  plugins: [require("daisyui")],
};
