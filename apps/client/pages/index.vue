<template>
  <Home v-if="isUserLoaded()"></Home>
  <Landing v-else></Landing>
</template>

<script setup lang="ts">
import { isUserLoaded } from "~/services/auth";
</script>
