<template>
  <div class="flex items-center justify-center h-full relative">
    <!-- <div class="absolute top-10 left-1/2 translate-x-[-50%]">
      <button
        class="btn"
        @click="audioPlay"
      >
        开始
      </button>
      <button
        class="btn"
        @click="audioPause"
      >
        暂停
      </button>
      <button
        class="btn"
        @click="testRestart"
      >
        重播
      </button>
      <div v-show="showAudio">
        <audio
          controls
          class="js-player"
          ref="playerElement"
        ></audio>
      </div>
    </div> -->

    <div v-show="!isStart">
      <p>
        音乐模式

        <PlayerSvg
          isAround
          @click="handleStartPlay"
        ></PlayerSvg>
      </p>
      <div v-show="showAudio">
        <audio
          controls
          class="js-player"
          ref="playerElement"
        ></audio>
      </div>
    </div>
    <div v-show="isStart">
      <template v-if="isQuestion()">
        <Question></Question>
      </template>
    </div>
  </div>
  <Tips></Tips>
</template>

<script setup lang="ts">
// import "plyr/dist/plyr.css";
import { onMounted, ref } from "vue";
import musicSrc from "~/assets/music/demo.mp3";
import { useMusicAudio } from "~/composables/audio";
import { useGameMode } from "~/composables/main/game";
import PlayerSvg from "./PlayerSvg.vue";
import Question from "./Question.vue";
import Tips from "./Tips.vue";

const { isQuestion } = useGameMode();

const showAudio = ref(false);
const playerElement = ref<HTMLAudioElement>();
const { setupAudio, audioPlay, audioPause, testRestart } = useMusicAudio();
const { isStart, handleStartPlay } = useStartGame();

onMounted(() => {
  setupAudio(playerElement.value!, musicSrc);
});

function useStartGame() {
  const isStart = ref(false);

  function handleStartPlay() {
    isStart.value = true;
    audioPlay();
  }

  return {
    isStart,
    handleStartPlay,
  };
}
</script>

<style scoped></style>
