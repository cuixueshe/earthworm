<template>
  <progress class="progress w-56 m-2" :value="currentSchedule" :max="max"></progress>
  <div class="text-center">({{ currentSchedule }} / {{ max }})</div>
</template>

<script setup lang="ts">
import { useCourseStore  } from "~/store/course";

const courseStore = useCourseStore();


const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});

const max = computed(() => {
  return courseStore.currentCourse?.statements.length || 0;
});

</script>

<style scoped></style>
~/store/course~/store/course-new