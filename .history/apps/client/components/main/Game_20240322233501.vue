<template>
  <div class="pt-20 md:pt-10 lg:pt-5">
    <div class="h-[40vh] flex flex-col justify-center">
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
import { useGameMode } from "~/composables/main/game";
import Answer from "./Answer.vue";
import AuthRequired from "./AuthRequired.vue";
import Question from "./Question/Question.vue";
import Share from "./Share.vue";
import Summary from "./Summary.vue";
import Tips from "./Tips.vue";

const { isAnswer, isQuestion } = useGameMode();
</script>
