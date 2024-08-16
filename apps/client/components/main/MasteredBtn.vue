<template>
  <button
    class="btn btn-outline btn-sm"
    @click="markStatementAsMastered"
  >
    掌握
  </button>
</template>

<script setup lang="ts">
import { useMastered } from "~/composables/main/useMastered";

const { markStatementAsMastered } = useMastered();
</script>

<style scoped></style>
