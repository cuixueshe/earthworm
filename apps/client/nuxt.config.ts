// https://nuxt.com/docs/api/configuration/nuxt-config

const appScripts: any = [];
if (process.env.NODE_ENV === "production") {
  addClarity();
}

// for https://clarity.microsoft.com/
function addClarity() {
  appScripts.push({
    innerHTML: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${process.env.CLARITY}");`,
  });
}

export default defineNuxtConfig({
  devServer: {
    host: "0.0.0.0",
  },
  css: ["~/assets/css/globals.css"],
  ssr: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxt/test-utils/module",
  ],
  app: {
    head: {
      title: "earthworm",
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
      script: appScripts,
    },
  },
  imports: {
    autoImport: false,
  },
});
