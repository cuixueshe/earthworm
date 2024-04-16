<!-- 用于 logto 的登录回调 -->
<script setup lang="ts">
import { useHandleSignInCallback, useLogto } from "@logto/vue";
import { navigateTo } from "nuxt/app";

import { getSignInCallback } from "~/services/auth";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const logto = useLogto();

const { isLoading } = useHandleSignInCallback(async () => {
  const res = await logto.fetchUserInfo();
  userStore.initUser(res!);

  await navigateTo(getSignInCallback());
});
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
</template>
