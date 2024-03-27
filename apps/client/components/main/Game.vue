<template>
  <div class="h-full pt-10">
    <div class="h-[40vh] flex flex-col aligh justify-center">
      <div class="h-1/2 w-full flex flex-wrap justify-center">
        <template v-if="isQuestion() && display">
          <AnswerTip></AnswerTip>
        </template>
      </div>
      <template v-if="isQuestion()">
        <Question></Question>
      </template>
      <template v-else-if="isAnswer()">
        <Answer></Answer>
      </template>
    </div>
  </div>
  <Tips></Tips>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import displayAnswer from "~/composables/main/displayAnswer";
import { useGameMode } from "~/composables/main/game";
import Answer from "./Answer.vue";
import AnswerTip from "./AnswerTip.vue";
import AuthRequired from "./AuthRequired.vue";
import Question from "./Question/Question.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { display } = displayAnswer();
const { isAnswer, isQuestion } = useGameMode();
</script>
