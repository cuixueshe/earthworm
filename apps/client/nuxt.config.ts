// https://nuxt.com/docs/api/configuration/nuxt-config

const isProd = process.env.NODE_ENV === "production";

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
});
