<template>
    <div
      class="absolute left-0 bottom-[-12px] h-[12px] bg-green-500 rounded rounded-tl-none rounded-bl-none transition-all"
      :style="{ width: currentPercentage + '%' }"></div>
</template>

<script setup lang="ts">
defineProps<{
  currentPercentage: number
}>()
</script>
