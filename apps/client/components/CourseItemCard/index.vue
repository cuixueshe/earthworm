<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="w-[330px] h-[220px] flex flex-col cursor-pointer border border-slate-400 rounded-xl px-6 py-4 hover:shadow-lg hover:shadow-purple-400/50 hover:border-purple-400 transition-all mb-4">
    <p class="text-2xl leading-loose font-bold">{{ title }}</p>
    <div class="mb-4"></div>
    <div>this is the course's description</div>
  </div>
</template>