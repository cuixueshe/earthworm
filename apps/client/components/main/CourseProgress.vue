<template>
  <div class="flex flex-col items-center py-6">
    <progress
      class="progress m-2 w-56"
      :value="currentSchedule"
      :max="courseStore.totalQuestionsCount"
    ></progress>
    <div class="text-center">({{ currentSchedule }} / {{ courseStore.totalQuestionsCount }})</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();

const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});
</script>
