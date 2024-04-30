<template>
  <div
    class="relative flex items-center justify-between border-t border-solid border-slate-200 py-3 text-base dark:border-slate-500"
  >
    <div class="flex items-center">
      <NuxtLink
        href="/music/courses"
        class="tooltip z-20 cursor-pointer select-none hover:text-fuchsia-500"
        data-tip="音乐列表"
      >
        <IconsExpand class="h-7 w-7" />
      </NuxtLink>
      <div class="tooltip z-20 ml-4 select-none">
        {{ currentMusicInfo }}
      </div>
    </div>
  </div>

  <CommonProgressBar
    class="h-6 p-[2px]"
    :percentage="currentPercentage"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useMusicStore } from "~/store/music";

const musicStore = useMusicStore();

const currentMusicInfo = computed(() => {
  return `${musicStore.currentMusic?.title}（${musicStore.lyricIndex + 1}/${musicStore.totalLyricsCount}）`;
});

const currentPercentage = computed(() => {
  if (musicStore.isAllDone()) return 100;
  return ((musicStore.lyricIndex / musicStore.totalLyricsCount) * 100).toFixed(2);
});
</script>
