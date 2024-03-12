<template>
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
  <Share></Share>
  <AuthRequired></AuthRequired>
</template>

<script setup lang="ts">
import MQuestion from './MQuestion.vue';
import MAnswer from "./MAnswer.vue";
import Summary from "./Summary.vue";
import Share from './Share.vue';
import MTips from "./MTips.vue";
import AuthRequired from './AuthRequired.vue';
import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from '~/store/course';

const { isAnswer, isQuestion } = useGameMode();
const courseStore = useCourseStore();
</script>

// button next 
// char button 
