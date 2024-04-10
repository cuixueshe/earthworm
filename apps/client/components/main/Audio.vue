<template>
  <div>
    <button
      class="btn"
      @click="play"
    >
      开始
    </button>
    <div v-show="showAudio">
      <audio
        controls
        class="js-player"
        ref="playerElement"
      ></audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import "plyr/dist/plyr.css";
import { onMounted, ref } from "vue";
import musicSrc from "~/assets/music/demo.mp3";
import { useMusicAudio } from "~/composables/audio";

const showAudio = ref(false);
const playerElement = ref<HTMLAudioElement>();
const { setupAudio, play } = useMusicAudio();

onMounted(() => {
  setupAudio(playerElement.value!, musicSrc);
});
</script>

<style scoped></style>
