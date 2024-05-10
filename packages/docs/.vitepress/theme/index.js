import DefaultTheme from "vitepress/theme";

import "./style.css";

import MyLayout from "../components/MyLayout.vue";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
