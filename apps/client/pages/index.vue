<template>
  <Home v-if="isAuthenticated()"></Home>
  <Landing v-else></Landing>
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";
</script>
