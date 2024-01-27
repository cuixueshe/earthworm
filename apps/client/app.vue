<template>
  <NuxtLayout>
    <n-message-provider>
      <HttpErrorProvider>
        <NuxtPage />
      </HttpErrorProvider>
    </n-message-provider>
  </NuxtLayout>
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
