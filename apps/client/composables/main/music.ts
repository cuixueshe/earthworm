import Plyr from "plyr";
import { ref } from "vue";
import { useCourseStore } from "~/store/course";
import { srtTimeToSeconds } from "~/utils/musicTime";

/**
 *
 * 开始  ->  播放音乐   ->
 * 暂停(endTime)  ->  用户输入  ->
 * 回车提交  ->  播放音乐
 *
 */

let player: Plyr;
const isPlayed = ref(false);

export function useMusicMode() {
  const courseStore = useCourseStore();

  function setupMusicAudio(playerElement: HTMLAudioElement, src: string) {
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
      pauseMusic();
    }
  }

  function playMusic() {
    player.play();
    isPlayed.value = true;
  }
  function pauseMusic() {
    player.pause();
    isPlayed.value = false;
  }

  function playStatement(time: string) {
    player.currentTime = srtTimeToSeconds(time);
    playMusic();
  }

  const hasPlayedMusic = () => isPlayed.value;

  return {
    setupMusicAudio,
    playMusic,
    pauseMusic,
    playStatement,
    hasPlayedMusic,
  };
}
