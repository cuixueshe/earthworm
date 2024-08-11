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
  </HttpErrorProvider>
</template>

<script setup lang="ts">
import { useAsyncData } from "#imports";

import { fetchCurrentUser } from "~/api/user";
import { useDarkMode } from "~/composables/darkMode";
import { isAuthenticated } from "~/services/auth";
import { useUserStore } from "./store/user";

const { initDarkMode } = useDarkMode();
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
