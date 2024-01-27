<template>
  <div class="h-full pt-20">
    <div class="h-[40vh] flex flex-col justify-center">
      <template v-if="isQuestion()">
        <Question></Question>
      </template>
      <template v-else-if="isAnswer()">
        <Answer></Answer>
      </template>
    </div>
    <CourseProgress></CourseProgress>
    <Tips></Tips>
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

