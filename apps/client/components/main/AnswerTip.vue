<template>
  <div class="text-5xl dark:text-gray-50 text-center">
    {{ courseStore.currentStatement?.english }}
  </div>
  <div class="mt-2 dark:text-gray-50 text-center">再次点击隐藏</div>
</template>

<script setup lang="ts">
// import displayAnswer from "~/composables/main/displayAnswer";
import { useCourseStore } from "~/store/course";
const courseStore = useCourseStore();
// const { display } = displayAnswer();
</script>

<style scoped></style>
