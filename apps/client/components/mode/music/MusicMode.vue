<template>
  <div class="flex items-center justify-center h-full relative">
    <div class="absolute top-10 left-1/2 translate-x-[-50%]">
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
    </div>
    <template v-if="isQuestion()">
      <Question></Question>
    </template>
  </div>
  <Tips></Tips>
</template>

<script setup lang="ts">
// import "plyr/dist/plyr.css";
import { onMounted, ref } from "vue";
import musicSrc from "~/assets/music/demo.mp3";
import { useMusicAudio } from "~/composables/audio";
import { useGameMode } from "~/composables/main/game";
import Question from "./Question.vue";
import Tips from "./Tips.vue";

const { isQuestion } = useGameMode();

const showAudio = ref(false);
const playerElement = ref<HTMLAudioElement>();
const { setupAudio, audioPlay, audioPause, testRestart } = useMusicAudio();

onMounted(() => {
  setupAudio(playerElement.value!, musicSrc);
});
</script>

<style scoped></style>
