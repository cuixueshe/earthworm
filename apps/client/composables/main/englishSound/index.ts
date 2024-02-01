import { useCourseStore } from "~/store/course";
import { updateSource, play } from "./audio";
import { watchEffect } from "vue";

let prevWord = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    const currentStatement = courseStore.currentStatement;
    if (!currentStatement) throw new Error("Please run courseStore.setup to initialize course first.");
    const word = currentStatement.english;
    if (prevWord !== word) {
      updateSource(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`);
    }
    prevWord = currentStatement.english;
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
