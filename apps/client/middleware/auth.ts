import { useGameMode } from "~/composables/main/game";
import { useUserStore } from "~/store/user"

export default defineNuxtRouteMiddleware((to, from) => {
  const { resetGameMode } = useGameMode();
  resetGameMode()
  const userStore = useUserStore()
  if (!userStore.getUserInfo() && +to.params.id !== 1) {
    return navigateTo("/auth/login");
  }
})