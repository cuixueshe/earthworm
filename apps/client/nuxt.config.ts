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
  ssr: false,
  // default is true, reference to https://nuxt.com/docs/guide/directory-structure/components
  // components: true,
  imports: {
    autoImport: false,
  },
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: "Earthworm",
      link: [{ rel: "icon", href: "/favicon.ico" }],
      script: appScripts,
    },
  },
  css: ["~/assets/css/globals.css"],
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxt/test-utils/module",
    "@hypernym/nuxt-anime",
    "@nuxt/image",
  ],
  plugins: ["~/plugins/logto.ts", "~/plugins/http.ts"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "",
      endpoint: process.env.LOGTO_ENDPOINT || "",
      appId: process.env.LOGTO_APP_ID || "",
      backendEndpoint: process.env.BACKEND_ENDPOINT || "",
      signInRedirectURI: process.env.LOGTO_SIGN_IN_REDIRECT_URI || "",
      signOutRedirectURI: process.env.LOGTO_SIGN_OUT_REDIRECT_URI || "",
      helpDocsURL: process.env.HELP_DOCS_URL || "",
    },
  },
  build: {
    transpile: ["vue-sonner"],
  },
});
