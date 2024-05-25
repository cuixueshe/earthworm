<template>
  <UserHome :username="username" />
</template>

<script setup lang="ts">
import { useRoute } from "#app";

const route = useRoute();
const username = route.params.username as string;
</script>

<style scoped></style>
