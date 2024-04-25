import { defineStore } from "pinia";
import { computed, ref, watchEffect } from "vue";

import { fetchMusic } from "~/api/music";
import lyrics1 from "~/assets/musics/1.json";
import music1 from "~/assets/musics/1.mp3";
import lyrics2 from "~/assets/musics/2.json";
import music2 from "~/assets/musics/2.mp3";

interface Lyric {
  id: number;
  chinese: string;
  english: string;
  startTime: number;
  endTime: number;
}

export interface Music {
  id: number;
  title: string;
  lyrics: Lyric[];
  songUrl: string;
}

// mock
// type MUSIC_COURSES = Record<number, Music>;
// export const music_courses: MUSIC_COURSES = {
//   1: {
//     id: 1,
//     title: "Twinkle Twinkle Little Star",
//     lyrics: lyrics1,
//     song: music1,
//   },
//   2: {
//     id: 2,
//     title: "Yesterday Once More",
//     lyrics: lyrics2,
//     song: music2,
//   },
// };

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

    // mock
    // currentMusic.value = music_courses[musicId];
    currentMusic.value = await fetchMusic(musicId);
    console.log(111, currentMusic.value);
  }

  return {
    currentMusic,
    currentLyric,
    lyricWords,
    totalLyricsCount,
    lyricIndex,
    isAllDone,
    toNextLyric,
    setup,
  };
});
