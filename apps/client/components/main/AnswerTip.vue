<template>
  <div class="text-4xl dark:text-gray-50 text-center h-1/2 w-full">
    <div
      class="dark:bg-zinc-700 hover:dark:bg-zinc-900 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 inline-block bg-slate-300 p-3 rounded-lg"
    >
      {{ courseStore.currentStatement?.english }}
      <div class="mt-1 text-2xl dark:text-gray-50 text-center">
        再次点击隐藏
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
const courseStore = useCourseStore();
</script>

<style scoped>
.transition {
  transition: all 0.3s ease-in-out;
}
</style>
