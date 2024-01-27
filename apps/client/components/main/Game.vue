<template>
  <div class="w-full flex-1 flex flex-col justify-center items-center pb-12">
    <div class="flex-1 mb-8">
      <template v-if="isQuestion()">
        <Question></Question>
      </template>
      <template v-else-if="isAnswer()">
        <Answer></Answer>
      </template>
    </div>
    <div class="py-8">
      <CourseProgress></CourseProgress>
      <Tips></Tips>
    </div>
    <Summary></Summary>
    <AuthRequired></AuthRequired>
  </div>
</template>

<script setup lang="ts">
import Question from "./Question.vue";
import Answer from "./Answer.vue";
import CourseProgress from "./CourseProgress.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";
import AuthRequired from './AuthRequired.vue';
import { useGameMode } from "~/composables/main/game";

const { isAnswer, isQuestion } = useGameMode();
</script>

<style scoped></style>
