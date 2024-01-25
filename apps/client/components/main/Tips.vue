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
import { useGameMode } from "~/composables/main/game";
import { registerShortcut, cancelShortcut } from "~/utils/keyboardShortcuts";
import { useCurrentStatementEnglishSound } from '~/composables/main/englishSound';


const { handlePlaySound } = usePlaySound()
const { handleShowAnswer } = useShowAnswer()


function usePlaySound() {
  const { sound } = useCurrentStatementEnglishSound();

  onMounted(() => {
    registerShortcut("ctrl+p", handlePlaySound);
  })

  onUnmounted(() => {
    cancelShortcut("ctrl+p", handlePlaySound);
  });

  function handlePlaySound() {
    sound.play();
  }

  return {
    handlePlaySound
  }
}

function useShowAnswer() {
  const { showAnswer } = useGameMode();

  onMounted(() => {
    registerShortcut("ctrl+n", handleShowAnswer);
  });

  onUnmounted(() => {
    cancelShortcut("ctrl+n", handleShowAnswer);
  });

  function handleShowAnswer() {
    showAnswer();
  }

  return {
    handleShowAnswer
  }

}
</script>