<template>
  <n-config-provider preflight-style-disabled>
    <NuxtLayout>
      <HttpErrorProvider>
        <NuxtPage />
      </HttpErrorProvider>
    </NuxtLayout>
  </n-config-provider>
</template>

<script setup lang="tsx">
import { useUserStore } from "~/store/user";

useRestoreUser();

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
