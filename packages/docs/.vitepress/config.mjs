import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Earthworm",
  description: "Earthworm",
  themeConfig: {
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Guide", link: "/guide/get-started/" },
      // { text: "Features", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "如何使用？", link: "/guide/get-started/how-to-use" },
          { text: "快速开始", link: "/guide/get-started/quick-start" },
        ],
      },
      {
        text: "贡献代码",
        items: [
          { text: "如何贡献代码？", link: "/guide/contribution/" },
          { text: "如何配置logto?", link: "/guide/contribution/config-logto" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/cuixueshe/earthworm" }],
    search: {
      provider: "local",
    },
  },
});
