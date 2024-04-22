import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

import { isAuthenticated } from "~/services/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (isAuthenticated()) {
    return navigateTo("/profile");
  }
});
