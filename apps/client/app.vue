<template>
  <NuxtLayout>
    <n-message-provider>
      <NuxtPage />
    </n-message-provider>
  </NuxtLayout>
</template>

<script setup lang="ts">
import "vfonts/Lato.css";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();

userStore.restoreUser();
</script>
