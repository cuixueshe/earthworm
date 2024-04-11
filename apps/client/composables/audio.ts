import Plyr from "plyr";
import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from "~/store/course";

let player: Plyr;

/**
 *
 * 开始  -> 播放音乐
 * 输入页面   暂停(开始时间)  ->  等待答题
 * 答案页面   播放   ->   暂停(结束时间)
 * next  ->
 */

export function useMusicAudio() {
  const courseStore = useCourseStore();
  const { isAnswer, isQuestion } = useGameMode();

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
    const startAt = srtTimeToSeconds(courseStore.currentStatement?.startTime);
    const endAt = srtTimeToSeconds(courseStore.currentStatement?.endTime);
    // 提高时间更新精度
    let count = 10;
    let timer = setInterval(() => {
      if (count == 0) {
        clearInterval(timer);
      } else {
        count--;
      }
      playStatement(startAt, endAt);
    }, 25);
  }

  function playStatement(startAt: number, endAt: number) {
    const time = player.currentTime;
    if (isQuestion()) {
      console.log(player.currentTime, startAt);
      if (time >= startAt) testPause();
    }

    if (isAnswer()) {
      console.log(player.currentTime, endAt);
      if (time >= endAt) testPause();
    }
  }

  function testPlay() {
    player.play();
  }
  function testPause() {
    player.pause();
  }

  function testRestart() {
    player.restart();
  }

  return {
    setupAudio,
    testPlay,
    testPause,
    testRestart,
  };
}

function srtTimeToSeconds(srtTime: string) {
  const timeParts = srtTime.split(":");
  const minutes = parseInt(timeParts[0], 10);
  const secondsAndMilliseconds = timeParts[1].split(".");
  const seconds = parseInt(secondsAndMilliseconds[0], 10);
  const milliseconds = parseInt(secondsAndMilliseconds[1], 10);

  return minutes * 60 + seconds + milliseconds / 1000;
}
