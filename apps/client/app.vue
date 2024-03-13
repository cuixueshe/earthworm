<template>
  <n-message-provider>
    <n-config-provider :theme="theme">
      <NuxtLayout :name="layout">
        <HttpErrorProvider>
          <NuxtPage />
        </HttpErrorProvider>
      </NuxtLayout>
    </n-config-provider>
  </n-message-provider>
</template>

<script setup lang="tsx">
import "vfonts/Lato.css";
import { useUserStore } from "~/store/user";
import { darkTheme, lightTheme } from "naive-ui";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { ref, computed, onMounted } from "vue";
import { isMobileSystem } from "./utils/system";

useRestoreUser();

const layout = isMobileSystem() ? "m-layout" : 'default';

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
