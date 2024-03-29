<template>
  <div class="h-full pt-20 relative">
    <PreNextBtn />
    <div class="h-[40vh] flex flex-col justify-center relative">
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
  </div>
  <Tips></Tips>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import Answer from "./Answer.vue";
import AnswerTip from "./AnswerTip.vue";
import AuthRequired from "./AuthRequired.vue";
import PreNextBtn from "./PreNextBtn.vue";
import Question from "./Question/Question.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
</script>
