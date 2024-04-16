<template>
  <NuxtLayout>
    <HttpErrorProvider>
      <NuxtPage />
    </HttpErrorProvider>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useLogto } from "@logto/vue";
import { onMounted } from "vue";

import { useDarkMode } from "~/composables/darkMode";
import { isAuthenticated } from "~/services/auth";
import { useUserStore } from "./store/user";

const { initDarkMode } = useDarkMode();

async function setup() {
  const userStore = useUserStore();
  const logto = useLogto();

  if (isAuthenticated()) {
    const res = await logto.fetchUserInfo();
    userStore.initUser(res!);
  }
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
