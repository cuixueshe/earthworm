<template>
  <div class="rounded-lg border dark:border-slate-400">
    <div
      class="h-full rounded-lg bg-gradient-to-r from-emerald-200 to-emerald-400 transition-all dark:from-emerald-300 dark:to-emerald-500"
      :style="{ width: `${percentage}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps(["percentage"]);
</script>
