<template>
  <div class="flex items-center justify-center h-full relative">
    <div
      v-show="!isStart"
      class="flex flex-col justify-center items-center relative z-10"
    >
      <blockquote
        class="text-2xl font-semibold italic text-center text-slate-900 dark:text-white pb-10"
      >
        全新体验，
        <span
          class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block"
        >
          <span class="relative text-white">音乐模式</span>
        </span>
        ，快来挑战
      </blockquote>

      <PlayerSvg
        isAround
        @click="handleStartPlay"
      ></PlayerSvg>

      <div v-show="showAudio">
        <audio
          ref="playerElement"
          controls
        ></audio>
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

    <div class="absolute z-[-10px] opacity-50">
      <ModeMusicPhonograph></ModeMusicPhonograph>
    </div>
  </div>
  <MainTips></MainTips>
</template>

<script setup lang="ts">
// import "plyr/dist/plyr.css";
import { onMounted, ref } from "vue";
import musicSrc from "~/assets/music/demo.mp3";
import { useGameMode } from "~/composables/main/game";
import { useMusicMode } from "~/composables/main/music";
import PlayerSvg from "./PlayerSvg.vue";

const { isQuestion } = useGameMode();

const showAudio = ref(false);
const playerElement = ref<HTMLAudioElement>();
const { setupMusicAudio, playMusic } = useMusicMode();
const { isStart, handleStartPlay } = useStartGame();

onMounted(() => {
  setupMusicAudio(playerElement.value!, musicSrc);
});

function useStartGame() {
  const isStart = ref(false);

  function handleStartPlay() {
    isStart.value = true;
    playMusic();
  }

  return {
    isStart,
    handleStartPlay,
  };
}
</script>
