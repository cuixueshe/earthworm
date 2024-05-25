<template>
  <UserHome
    v-if="isUserLoaded()"
    :username="userStore.userInfo?.username!"
  />
  <Landing v-else></Landing>
</template>

<script setup lang="ts">
import { isUserLoaded } from "~/services/auth";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>
