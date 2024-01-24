<template>
  <div class="h-full w-full flex flex-col justify-center items-center">
    <div class="flex-1 mb-8">
      <template v-if="mode === 'question'">
        <Question></Question>
      </template>
      <template v-else-if="mode === 'answer'">
        <Answer></Answer>
      </template>
    </div>
    <div class="">
      <CourseProgress></CourseProgress>
      <Tips></Tips>
    </div>
    <Summary></Summary>
  </div>
</template>

<script setup lang="ts">
import Question from "./Question.vue";
import Answer from "./Answer.vue";
import CourseProgress from "./CourseProgress.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";
import { useMode } from "./game";

const { mode } = useMode();

const showModal = ref(false);
</script>

<style scoped></style>
