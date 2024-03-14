<template>
  <div class="h-full pt-20">
    <div class="flex flex-col justify-center">
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
import { onUnmounted } from "vue";
import Question from "./Question.vue";
import Answer from "./Answer.vue";
import Summary from "./Summary.vue";
import Share from "./Share.vue";
import Tips from "./Tips.vue";
import AuthRequired from "./AuthRequired.vue";
import { useGameMode } from "~/composables/main/game";
import { useCourseTime } from "~/composables/courses/time";
import { useCourseStore } from "~/store/course";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

const { isAnswer, isQuestion } = useGameMode();
const courseStore = useCourseStore();
const { pauseTiming } = useCourseTime();

// 离开答题页面记录结束时间
onUnmounted(() => {
  if (courseStore.currentCourse) {
    pauseTiming(courseStore.currentCourse.id);
  }
});
</script>
