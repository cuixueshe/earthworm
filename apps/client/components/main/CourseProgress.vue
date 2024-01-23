<template>
  <progress class="progress w-56 m-2" value="8" max="100"></progress>
</template>

<script setup lang="ts">
import { useCoursesStore } from "~/store/courses";

const coursesStore = useCoursesStore();

const currentSchedule = computed(() => {
  return coursesStore.statementIndex.value + 1;
});

const max = computed(() => {
  return coursesStore.currentCourse?.statements.length || 0;
});

</script>

<style scoped></style>
