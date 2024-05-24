import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Earthworm",
  description: "Earthworm",
  ignoreDeadLinks: true,
  themeConfig: {
    logo: "/logo.png",
    logoLink: "/get-started/",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: "指南", link: "get-started/" },
      // { text: "Features", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "指南", link: "/get-started/" },
          { text: "如何使用？", link: "/get-started/how-to-use" },
          { text: "快速开始", link: "/get-started/quick-start" },
        ],
      },
      {
        text: "贡献代码",
        items: [
          { text: "如何贡献代码？", link: "/contribution/" },
          { text: "如何配置logto?", link: "/contribution/config-logto" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/cuixueshe/earthworm" }],
    search: {
      provider: "local",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-2024, Earthworm. All rights reserved.",
    },
    editLink: {
      pattern: "https://github.com/cuixueshe/earthworm/packages/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});
