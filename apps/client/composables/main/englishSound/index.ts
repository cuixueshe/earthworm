import { useCourseStore } from "~/store/course";
import { updateSource, play } from "./audio";

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    if (prevWord !== word) {
      updateSource(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`);
    }
    prevWord = courseStore.currentStatement?.english;
  });

  return {
    playSound: () => {
      play();
    },
  };
}

export function reset() {
  prevWord = "";
}
