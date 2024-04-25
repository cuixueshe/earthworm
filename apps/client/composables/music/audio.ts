import Plyr from "plyr";

import { useMusicStore } from "~/store/music";

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
    // 提高时间更新精度
    let count = 10;
    let timer = setInterval(() => {
      if (count == 0) {
        clearInterval(timer);
      } else {
        count--;
      }
      pauseLyric();
    }, 25);
  }

  function pauseLyric() {
    if (
      musicStore.currentLyric?.endTime &&
      player.currentTime >= musicStore.currentLyric?.endTime
    ) {
      pauseMusic();
    }
  }

  function playMusic() {
    player.play();
  }
  function pauseMusic() {
    player.pause();
  }

  function playLyric() {
    if (musicStore.currentLyric?.startTime) {
      player.currentTime = musicStore.currentLyric?.startTime;
      playMusic();
    }
  }

  return {
    setupMusicAudio,
    playMusic,
    pauseMusic,
    playLyric,
  };
}
