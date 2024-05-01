<template>
  <div class="mx-auto w-full max-w-screen-xl">
    <Home v-if="isAuthenticated()"></Home>
    <Landing v-else></Landing>
  </div>
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";
</script>
