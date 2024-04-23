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
      <MusicQuestion></MusicQuestion>
    </div>

    <!-- <div class="absolute z-[-10px] opacity-20 dark:opacity-55">
      <ModeMusicPhonograph></ModeMusicPhonograph>
    </div> -->
  </div>
  <MusicTips />
  <MainSummary />
  <MainShare />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useMusicAudio } from "~/composables/music/audio";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { setupMusicAudio, playMusic } = useMusicAudio();
const playerElement = ref<HTMLAudioElement>();

onMounted(() => {
  setupMusicAudio(playerElement.value!);
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
