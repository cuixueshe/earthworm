<template>
  <n-message-provider>
    <n-config-provider :theme="theme">
      <NuxtLayout>
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
import { darkTheme, lightTheme } from 'naive-ui';
import { Theme } from '~/composables/darkMode';

useRestoreUser();

const { initDarkMode, darkMode, } = useDarkMode()

function useRestoreUser() {
  const userStore = useUserStore();
  userStore.restoreUser();
}

onMounted(() => {
  initDarkMode()
})

const theme = computed(() => {
  return darkMode.value === Theme.DARK ? darkTheme : lightTheme
})
</script>
