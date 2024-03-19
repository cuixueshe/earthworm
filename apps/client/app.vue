<template>
  <n-config-provider :theme="theme">
    <NuxtLayout>
      <HttpErrorProvider>
        <NuxtPage />
      </HttpErrorProvider>
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup lang="tsx">
import "vfonts/Lato.css";
import { useUserStore } from "~/store/user";
import { darkTheme, lightTheme } from "naive-ui";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { computed, onMounted } from "vue";

useRestoreUser();

const { initDarkMode, darkMode } = useDarkMode();

function useRestoreUser() {
  const userStore = useUserStore();
  userStore.restoreUser();
}

onMounted(() => {
  initDarkMode();
});

const theme = computed(() => {
  return darkMode.value === Theme.DARK ? darkTheme : lightTheme;
});
</script>

<style>
#jfToolbar,
.mod-json {
  display: none !important;
}
</style>
