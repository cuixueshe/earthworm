import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";
import { createLogto, type LogtoConfig, UserScope, useLogto } from "@logto/vue";
import { setupAuth } from "~/services/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const config: LogtoConfig = {
    endpoint: runtimeConfig.public.endpoint,
    appId: runtimeConfig.public.appId,

    scopes: [
      UserScope.Email,
      UserScope.Phone,
      UserScope.CustomData,
      UserScope.Identities,
      UserScope.Organizations,
    ],
    resources: [runtimeConfig.public.backendEndpoint],
  };

  nuxtApp.vueApp.use(createLogto, config);
  setupAuth();
});
