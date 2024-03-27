<template>
  <div class="text-5xl dark:text-gray-50 text-center h-1/2 w-full">
    <div class="dark:bg-zinc-900 inline-block bg-slate-300 p-3 rounded-lg">
      {{ courseStore.currentStatement?.english }}
      <div class="mt-1 text-2xl dark:text-gray-50 text-center">
        再次点击隐藏
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import displayAnswer from "~/composables/main/displayAnswer";
import { useCourseStore } from "~/store/course";
const courseStore = useCourseStore();
// const { display } = displayAnswer();
</script>

<style scoped></style>
