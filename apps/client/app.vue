<template>
  <div
    class="h-screen w-screen"
    v-if="isSetupLoading"
  >
    <Loading />
  </div>
  <template v-else>
    <NuxtLayout>
      <HttpErrorProvider>
        <NuxtPage />
      </HttpErrorProvider>
    </NuxtLayout>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { fetchCurrentUser } from "~/api/user";
import { useDarkMode } from "~/composables/darkMode";
import { isAuthenticated } from "~/services/auth";
import { useUserStore } from "./store/user";

const { initDarkMode } = useDarkMode();

const isSetupLoading = ref(false);
async function setup() {
  isSetupLoading.value = true;
  const userStore = useUserStore();

  if (isAuthenticated()) {
    const user = await fetchCurrentUser();
    userStore.initUser(user);
  }
  isSetupLoading.value = false;
}

setup();

onMounted(() => {
  initDarkMode();
});
</script>

<style>
#jfToolbar,
.mod-json {
  display: none !important;
}
</style>
