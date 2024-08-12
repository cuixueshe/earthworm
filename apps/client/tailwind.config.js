/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      boxShadow: {
        "even-md": "0 0px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
        "even-lg": "0 2px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
        "even-xl": "0 4px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
      },
      animation: {
        wink: "wink 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shake: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      },
      keyframes: {
        wink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },
          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },
          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },
          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
      backgroundColor: {
        "theme-dark": "#05051d",
      },
      colors: {
        "theme-dark": "#05051d",
      },
      fontFamily: {
        customFont: ["CustomFont", "sans-serif"], // 自定义字体
      },
      borderColor: {
        "theme-dark": "#05051d",
      },
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addComponents, addUtilities }) {
      const buttons = {
        ".tw-btn-blue": {
          backgroundColor: "#4e80ee",
          color: "#fff",
          border: "none",
          "&:hover": {
            backgroundColor: "#3662e3",
          },
        },
      };

      addComponents(buttons);

      const scrollbar = {
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* 适用于 IE 和 Edge */,
          "scrollbar-width": "none" /* 适用于 Firefox */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      };

      addUtilities(scrollbar, ["responsive"]);
    },
  ],
};
