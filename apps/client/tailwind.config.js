const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
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
    iconsPlugin({
      // 配置需要的 icon 包就行（需要安装）
      // 来这里找 https://icones.js.org/
      collections: getIconCollections(["ph", "simple-icons"]),
    }),
  ],
};
