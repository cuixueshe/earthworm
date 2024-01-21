<template>
  <div class="h-full flex justify-center items-center relative">
    <div>
      <template v-if="mode === 'question'">
        <Question @bingo="handleBingo"></Question>
      </template>
      <template v-else-if="mode === 'answer'">
        <Answer @next-question="handleNextQuestion"></Answer>
      </template>
    </div>
    <div class="absolute bottom-10 mb-10 w-full flex flex-col items-center">
      <CourseProgress></CourseProgress>
      <Tips onShowAnswer="{handleShowAnswer}"></Tips>
    </div>
  </div>
</template>

<script setup lang="ts">
import Question from "./Question.vue";
import Answer from "./Answer.vue";
import CourseProgress from "./CourseProgress.vue";
import Tips from './Tips.vue';

const mode = ref<"question" | "answer">("question");

function handleBingo() {
  mode.value = "answer";
}

function handleNextQuestion() {
  mode.value = "question";
}
</script>

<style scoped></style>
