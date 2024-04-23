<template>
  <div class="relative flex h-full items-center justify-center">
    <div
      v-show="!isStart"
      class="relative z-10 flex flex-col items-center justify-center"
    >
      <p>准备好了吗？(按任意键开启游戏)</p>
      <div class="hidden">
        <audio ref="playerElement"></audio>
      </div>
    </div>
    <div
      v-show="isStart"
      class="relative z-10"
    >
      <template v-if="isQuestion()">
        <ModeMusicQuestion></ModeMusicQuestion>
      </template>
    </div>

    <div class="absolute z-[-10px] opacity-20 dark:opacity-55">
      <ModeMusicPhonograph></ModeMusicPhonograph>
    </div>
  </div>
  <ModeMusicTips></ModeMusicTips>
</template>

<script setup lang="ts">
// import "plyr/dist/plyr.css";
import { onMounted, ref } from "vue";

import { useMusicChapter } from "~/composables/courses/music";
import { useGameMode } from "~/composables/main/game";
import { useMusicMode } from "~/composables/main/music";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { isQuestion } = useGameMode();
const playerElement = ref<HTMLAudioElement>();
const { setupMusicAudio, playMusic } = useMusicMode();
const { currentMusic } = useMusicChapter();

onMounted(() => {
  setupMusicAudio(playerElement.value!, currentMusic.value);
});

const { isStart } = useStartGame();

function useStartGame() {
  const isStart = ref(false);

  function handleKeyup(e: KeyboardEvent) {
    e.preventDefault();
    isStart.value = true;
    playMusic();
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
