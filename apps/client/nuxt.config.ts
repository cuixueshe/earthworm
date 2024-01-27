// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["~/assets/css/globals.css"],
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@bg-dev/nuxt-naiveui",
    "@nuxt/test-utils/module",
  ],
  app: {
    head: {
      title: "earthworm",
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
      ],
    }
  }
});
