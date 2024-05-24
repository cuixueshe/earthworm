<template></template>
<script setup lang="ts">
import { useRouter } from "nuxt/app";

import { useUserStore } from "~/store/user";

const userStore = useUserStore();

const username = userStore.userInfo?.username;
const router = useRouter();
router.replace(`/user/${username}`);
</script>

<style scoped></style>
