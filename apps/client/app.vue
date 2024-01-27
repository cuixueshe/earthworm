<template>
  <n-message-provider>
    <NuxtLayout>
      <HttpErrorProvider>
        <NuxtPage />
      </HttpErrorProvider>
    </NuxtLayout>
  </n-message-provider>
</template>

<script setup lang="tsx">
import "vfonts/Lato.css";
import { useUserStore } from "~/store/user";

useRestoreUser();

function useRestoreUser() {
  const userStore = useUserStore();
  userStore.restoreUser();
}
</script>
