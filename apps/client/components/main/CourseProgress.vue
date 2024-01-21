<template>
  <div>进度：{{ currentSchedule }}/{{ max }}</div>
</template>

<script setup lang="ts">
import { useCoursesStore } from "~/store/courses";

const coursesStore = useCoursesStore();

const currentSchedule = computed(() => {
  return coursesStore.statementIndex + 1;
});

const max = computed(() => {
  return coursesStore.currentCourse?.statements.length || 0;
});

</script>

<style scoped></style>
