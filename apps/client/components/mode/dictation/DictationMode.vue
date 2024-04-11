<template>
  <div class="flex items-center justify-center h-full relative">
    <div v-if="!isStart">
      <p>准备好了吗？(按任意键开启游戏)</p>
    </div>
    <div v-else>
      <Toolbar></Toolbar>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Answer from "~/components/main/Answer.vue";
import AnswerTip from "~/components/main/AnswerTip.vue";
import Tips from "~/components/main/Tips.vue";
import { useAnswerTip } from "~/composables/main/answerTip";
import { useGameMode } from "~/composables/main/game";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";
import Question from "./Question.vue";
import Toolbar from "./Toolbar.vue";

const { isAnswer, isQuestion } = useGameMode();
const { isAnswerTip } = useAnswerTip();
const { isStart } = useStartGame();

function useStartGame() {
  const isStart = ref(false);

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    isStart.value = true;
    cancelShortcut("*", handleKeyup);
  }

  onMounted(() => {
    registerShortcut("*", handleKeyup);
  });

  return {
    isStart,
  };
}
</script>

<style scoped></style>
