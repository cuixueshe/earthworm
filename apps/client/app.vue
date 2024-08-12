<template>
  <HttpErrorProvider>
    <div
      class="h-screen w-screen"
      v-if="status === 'pending'"
    >
      <Loading />
    </div>
    <template v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </template>
    <UModals />
    <Toaster
      :theme="darkMode === Theme.DARK ? 'dark' : 'light'"
      position="top-center"
      :toastOptions="{
        style: {
          background: darkMode === Theme.DARK ? '#c084fc' : '#f3e8ff',
          color: darkMode === Theme.DARK ? '#000' : '#6b21a8',
        },
      }"
    />
  </HttpErrorProvider>
</template>

<script setup lang="ts">
import { useAsyncData } from "#imports";
import { Toaster } from "vue-sonner";

import { fetchCurrentUser } from "~/api/user";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { isAuthenticated } from "~/services/auth";
import { useUserStore } from "./store/user";

const { initDarkMode, darkMode } = useDarkMode();
initDarkMode();

const userStore = useUserStore();
const { status } = useAsyncData("initApplication", async () => {
  if (isAuthenticated()) {
    const user = await fetchCurrentUser();
    userStore.initUser(user);
  }
});
</script>

<style>
#jfToolbar,
.mod-json {
  display: none !important;
}
</style>
