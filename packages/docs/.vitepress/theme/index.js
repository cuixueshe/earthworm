import DefaultTheme from "vitepress/theme";

import MyLayout from "./components/MyLayout.vue";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
