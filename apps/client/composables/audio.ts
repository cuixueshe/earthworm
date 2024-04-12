import Plyr from "plyr";
import { useCourseStore } from "~/store/course";

let player: Plyr;

/**
 *
 * 开始  ->  播放音乐   ->
 * 暂停(endTime)  ->  用户输入  ->
 * 回车提交  ->  播放音乐
 *
 */

export function useMusicAudio() {
  const courseStore = useCourseStore();

  function setupAudio(playerElement: HTMLAudioElement, src: string) {
    player = new Plyr(playerElement, {
      seekTime: 0.1,
    });
    player.source = {
      type: "audio",
      title: "",
      sources: [{ src, type: "audio/mp3" }],
    };
    player.on("timeupdate", () => {
      runTimeUpdate();
    });
  }

  function runTimeUpdate() {
    const endAt = srtTimeToSeconds(courseStore.currentStatement?.endTime);
    // 提高时间更新精度
    let count = 10;
    let timer = setInterval(() => {
      if (count == 0) {
        clearInterval(timer);
      } else {
        count--;
      }
      pauseStatement(endAt);
    }, 25);
  }

  function pauseStatement(pauseTime: number) {
    if (player.currentTime >= pauseTime) {
      audioPause();
    }
  }

  function audioPlay() {
    player.play();
  }
  function audioPause() {
    player.pause();
  }

  function playStatement(time: string) {
    player.currentTime = srtTimeToSeconds(time);
    player.play();
  }

  return {
    setupAudio,
    audioPlay,
    audioPause,

    playStatement,
  };
}

export function srtTimeToSeconds(srtTime: string) {
  const timeParts = srtTime.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const secondsAndMilliseconds = timeParts[1].split(".");
  const seconds = parseInt(secondsAndMilliseconds[0], 10);
  const milliseconds = parseInt(secondsAndMilliseconds[1], 10);
  return minutes * 60 + seconds + milliseconds / 1000;
}
