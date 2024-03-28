<template>
  <NuxtLayout>
    <HttpErrorProvider>
      <NuxtPage />
    </HttpErrorProvider>
  </NuxtLayout>
</template>

<script setup lang="tsx">
import { onMounted } from "vue";
import { useDarkMode } from "~/composables/darkMode";
import { useUserStore } from "~/store/user";

const { initDarkMode } = useDarkMode();

useRestoreUser();

onMounted(() => {
  initDarkMode();
});

function useRestoreUser() {
  const userStore = useUserStore();
  userStore.restoreUser();
}
</script>

<style>
#jfToolbar,
.mod-json {
  display: none !important;
}
</style>
