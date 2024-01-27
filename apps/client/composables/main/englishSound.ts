import { useCourseStore } from "~/store/course";

var audio = new Audio();
function updateEnglishSound(word: string) {
  audio.src = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;
  audio.load();
}

let prevEnglish = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    if (prevEnglish !== courseStore.currentStatement?.english) {
      updateEnglishSound(courseStore.currentStatement?.english);
    }
    prevEnglish = courseStore.currentStatement?.english;
  });

  return {
    playSound: () => {
      audio.play();
    },
  };
}
