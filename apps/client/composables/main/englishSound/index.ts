import { useCourseStore } from "~/store/course";
import { updateSource, play, isPlay } from "./audio";
import { watchEffect, ref } from "vue";

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();
  const audioPlaying = ref(false);
  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    if (prevWord !== word) {
      updateSource(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`);
    }
    prevWord = courseStore.currentStatement?.english!;
  });

  function audioIconChange() {
    const timerId = setInterval(() => {
      if (isPlay()) {
        audioPlaying.value = !audioPlaying.value;
      } else {
        audioPlaying.value = false;
        clearInterval(timerId);
      }
    }, 280);
  }
  return {
    audioPlaying,
    playSound: () => {
      play();
      audioIconChange();
    },
  };
}

// 朗读每日一句
export function readOneSentencePerDayAloud(str: string) {
  updateSource(`https://dict.youdao.com/dictvoice?audio=${str}&type=1`);
  play();
}

export function reset() {
  prevWord = "";
}
