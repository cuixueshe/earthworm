<template>
  <div class="flex items-center justify-center h-full">
    <template v-if="isQuestion()">
      <ModeChineseToEnglishQuestion />
      <template v-if="isAnswerTip()">
        <MainAnswerTip />
      </template>
    </template>
    <template v-else-if="isAnswer()">
      <MainAnswer />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
</script>
