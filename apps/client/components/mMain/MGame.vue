<template>
  <div class="relative">
    <p class="ml-4 mr-1 text-gray-400">
      {{ courseStore.currentCourse?.title }}
      （{{ courseStore.statementIndex + 1 }}<span class="mx-[2px]">/</span>{{ courseStore.totalQuestionsCount }}）
    </p>
    <Progress :currentPercentage="currentPercentage"></Progress>
  </div>
  <div class="h-full pt-20">
    <div class="h-[40vh] flex flex-col justify-center">
      <template v-if="isQuestion()">
        <MQuestion></MQuestion>
      </template>
      <template v-else-if="isAnswer()">
        <MAnswer></MAnswer>
      </template>
    </div>
  </div>
  <MTips></MTips>
  <Summary></Summary>
  <MShare></MShare>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import Progress from '~/components/main/Progress.vue';
import MQuestion from './MQuestion.vue';
import MAnswer from "./MAnswer.vue";
import Summary from "~/components/main/Summary.vue";
import MShare from './MShare.vue';
import MTips from "./MTips.vue";
import AuthRequired from '~/components/main/AuthRequired.vue';
import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from '~/store/course';
import { computed } from 'vue';

const { isAnswer, isQuestion } = useGameMode();
const courseStore = useCourseStore();

const currentPercentage = computed(() => {
  if (courseStore.isAllDone()) {
    return 100;
  }
  return +(
    (courseStore.statementIndex / courseStore.totalQuestionsCount) *
    100
  ).toFixed(2);
});
</script>
