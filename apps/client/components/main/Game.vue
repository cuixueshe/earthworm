<template>
  <div class="flex items-center justify-center h-full">
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
  <Tips></Tips>
  <Summary></Summary>
  <Share></Share>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import Answer from "./Answer.vue";
import AnswerTip from "./AnswerTip.vue";
import AuthRequired from "./AuthRequired.vue";
import Question from "./Question/Question.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();


onMounted(() => {
  courseTimer.reset()
})

</script>
