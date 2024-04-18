import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

import { isAuthenticated, signIn } from "~/services/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (!isAuthenticated() && +to.params.id !== 1) {
    signIn();
  }
});
