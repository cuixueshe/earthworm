<template>
  <div class="text-center">
    <div class="group relative mb-4 mt-10 text-2xl dark:text-gray-50">
      <template v-if="currentTip === TipItem.Chinese">
        {{ chineseStatement }}
      </template>
      <template v-else-if="currentTip === TipItem.English">
        {{ englishStatement }}
      </template>
      <template v-else-if="currentTip === TipItem.AllShow">
        <div class="flex flex-col">
          <span> {{ chineseStatement }} </span>
          <span> {{ englishStatement }} </span>
        </div>
      </template>

      <div
        v-if="!!lyricStartTime"
        class="absolute right-[-50px] top-0 hidden h-full flex-shrink-0 items-center justify-center group-hover:flex"
      >
        <div
          class="h-7 cursor-pointer rounded-xl border border-gray-500 px-2 text-base leading-7 text-gray-500"
          @click="playLyric"
        >
          <span class="i-ph-play" />
          <span class="pl-1">{{ currentLyricStartTime }}</span>
        </div>
      </div>
    </div>
    <MusicQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useMusicAudio } from "~/composables/music/audio";
import { TipItem, useTips } from "~/composables/music/tip";
import { useMusicStore } from "~/store/music";

const musicStore = useMusicStore();
const { currentTip } = useTips();
const { playLyric, lyricStartTime } = useMusicAudio();
const { currentLyricStartTime } = useLyricStartTime();

const chineseStatement = computed(() => musicStore.currentLyric?.chinese || "");
const englishStatement = computed(() => musicStore.currentLyric?.english || "");

function useLyricStartTime() {
  const currentLyricStartTime = computed(() => {
    return musicStore.currentLyric?.startTime
      ? formatStartTime(musicStore.currentLyric.startTime)
      : "";
  });
  function formatStartTime(time: string) {
    return time.split(",")[0].slice(3);
  }
  return {
    currentLyricStartTime,
  };
}
</script>
