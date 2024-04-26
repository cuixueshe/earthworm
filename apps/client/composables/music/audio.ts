import Plyr from "plyr";
import { computed } from "vue";

import { useMusicStore } from "~/store/music";
import { srtTimeToSeconds } from "~/utils/musicTime";

/**
 *
 * 开始  ->  播放音乐   ->
 * 暂停(endTime)  ->  用户输入  ->
 * 回车提交  ->  播放音乐
 *
 */

let player: Plyr;

export function useMusicAudio() {
  const musicStore = useMusicStore();

  function setupMusicAudio(playerElement: HTMLAudioElement) {
    if (!musicStore.currentMusic?.songUrl) return;
    player = new Plyr(playerElement, { seekTime: 0.1 });
    player.source = {
      type: "audio",
      title: musicStore.currentMusic.title,
      sources: [
        {
          src: musicStore.currentMusic.songUrl,
          type: "audio/mp3",
        },
      ],
    };
    player.on("timeupdate", () => {
      runTimeUpdate();
    });
  }

  function runTimeUpdate() {
    if (!musicStore.currentLyric?.endTime) return;
    const endAt = srtTimeToSeconds(musicStore.currentLyric.endTime);
    // 提高时间更新精度
    let count = 10;
    let timer = setInterval(() => {
      if (count == 0) {
        clearInterval(timer);
      } else {
        count--;
      }
      pauseLyric(endAt);
    }, 25);
  }

  function pauseLyric(pauseTime: number) {
    if (player.currentTime >= pauseTime) {
      pauseMusic();
    }
  }

  function playMusic() {
    player.play();
  }
  function pauseMusic() {
    player.pause();
  }

  const lyricStartTime = computed(() =>
    musicStore.currentLyric?.startTime ? srtTimeToSeconds(musicStore.currentLyric?.startTime) : "",
  );

  function playLyric() {
    if (!lyricStartTime.value) return;
    player.currentTime = lyricStartTime.value;
    playMusic();
  }

  return {
    setupMusicAudio,
    playMusic,
    pauseMusic,
    playLyric,
    lyricStartTime,
  };
}
