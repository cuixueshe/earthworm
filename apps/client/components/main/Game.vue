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
  <MessageBox
    content="请横向屏幕以获得最佳体验"
    v-model:isShowModal="display"
    cancel-btn-text="确定"
    confirmBtnText=""
  ></MessageBox>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import MessageBox from "~/components/main/MessageBox/MessageBox.vue";
import { courseTimer } from "~/composables/courses/courseTimer";
import judgeDevice from "~/composables/main/adjustDeviceTip";
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
const { display, checkScreenOrientation } = judgeDevice();

screen.orientation.addEventListener("change", (event) => {
  checkScreenOrientation();
});

onMounted(() => {
  courseTimer.reset();
  checkScreenOrientation();
});
</script>
