<template>
  <div class="relative w-[500px] h-[500px]">
    <img
      class="absolute top-[-30px] left-1/2 z-10 needle"
      :class="hasPlayedMusic() ? 'needle-play' : 'needle-notPlay'"
      src="~/assets/music/needle.png"
      alt="music-needle"
    />
    <div class="record-box">
      <div
        class="relative"
        :class="hasPlayedMusic() ? 'record' : ''"
      >
        <img
          class=""
          src="~/assets/music/disc.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicMode } from "~/composables/main/music";

const { hasPlayedMusic } = useMusicMode();
</script>

<style scoped>
.needle {
  transform-origin: 25px 25px;
  transition: all 0.8s ease;
}
.needle-play {
  transform: translateX(-24px) rotate(0deg);
}
.needle-notPlay {
  transform: translateX(-24px) rotate(-40deg);
}
.record-box {
  @apply relative before:block before:absolute before:-inset-1 before:rounded-[50%] before:border before:border-white before:border-opacity-5 before:border-solid before:bg-white before:bg-opacity-5 before:scale-[0.8];
}

.record {
  transform-origin: center;
  animation: rotate 5s infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
