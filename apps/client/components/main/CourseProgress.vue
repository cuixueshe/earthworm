<template>
  <div class="py-6 flex flex-col items-center">
    <progress
      class="progress w-56 m-2"
      :value="currentSchedule"
      :max="courseStore.totalQuestionsCount"
    ></progress>
    <div class="text-center">
      ({{ currentSchedule }} / {{ courseStore.totalQuestionsCount }})
    </div>
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
