import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { useUserStore } from "~/store/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  if (!userStore.getUserInfo() && +to.params.id !== 1) {
    return navigateTo("/auth/login");
  }
})