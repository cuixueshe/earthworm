import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

import { fetchMusic } from "~/api/music";

interface Lyric {
  id: number;
  chinese: string;
  english: string;
  startTime: string;
  endTime: string;
}

export interface Music {
  id: number;
  title: string;
  lyrics: Lyric[];
  songUrl: string;
}

export const useMusicStore = defineStore("music", () => {
  const currentMusic = ref<Music>();
  const currentLyric = ref<Lyric>();
  const lyricIndex = ref(0);

  watchEffect(() => {
    currentLyric.value = currentMusic.value?.lyrics[lyricIndex.value];
  });

  const lyricWords = computed(() => currentLyric.value?.english.split(" ") || []);

  const totalLyricsCount = computed(() => currentMusic.value?.lyrics.length || 0);

  function isAllDone() {
    return lyricIndex.value >= totalLyricsCount.value - 1;
  }

  function toNextLyric() {
    lyricIndex.value = Math.min(lyricIndex.value + 1, totalLyricsCount.value - 1);
  }

  function resetLyricIndex() {
    lyricIndex.value = 0;
  }

  async function setup(musicId: number) {
    // 暂时未作进度管理
    resetLyricIndex();
    if (musicId === currentMusic.value?.id) return;
    currentMusic.value = await fetchMusic(musicId);
  }

  return {
    currentMusic,
    currentLyric,
    lyricWords,
    totalLyricsCount,
    lyricIndex,
    isAllDone,
    toNextLyric,
    resetLyricIndex,
    setup,
  };
});
