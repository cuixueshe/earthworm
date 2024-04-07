<template>
  <div class="flex items-center justify-center h-full relative">
    <template v-if="isQuestion()">
      <Question></Question>
      <template v-if="isAnswerTip()">
        <AnswerTip></AnswerTip>
      </template>
    </template>
    <template v-else-if="isAnswer()">
      <Answer></Answer>
    </template>
  </div>
</template>

<script setup lang="ts">
import Answer from "~/components/main/Answer.vue";
import AnswerTip from "~/components/main/AnswerTip.vue";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import Question from "./Question.vue";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
</script>

<style scoped></style>
