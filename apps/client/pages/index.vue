<template>
  <div class="container w-full font-customFont">
    <template v-if="!isAuthenticated()">
      <Home></Home>
    </template>
    <template v-else>
      <Landing></Landing>
    </template>
  </div>
</template>

<script setup lang="ts">
import { isAuthenticated } from "~/services/auth";
</script>
