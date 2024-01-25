<template>
  <div class="flex flex-col">
    <div class="flex mb-2">
      <button className="btn btn-xs" @click="handleShowAnswer">⌃ Ctrl+n</button>
      <p class="ml-2">show answer</p>
    </div>
    <div class="flex">
      <button className="btn btn-xs" @click="handlePlaySound">⌃ Ctrl+p</button>
      <p class="ml-2">play soundmark</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMode } from "./game";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";

const { showAnswer } = useMode();
const { sound } = useCurrentStatementEnglishSound();

function handleShowAnswer() {
  showAnswer();
}

function handlePlaySound() {
  sound.play();
}

onMounted(() => {
  registerShortcut("ctrl+p", handlePlaySound);
  registerShortcut("ctrl+n", handleShowAnswer);
});

onUnmounted(() => {
  cancelShortcut("ctrl+p", handlePlaySound);
  cancelShortcut("ctrl+n", handleShowAnswer);
});
</script>
