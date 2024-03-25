import { watchEffect } from "vue";
import { useAnswerMode } from "~/composables/user/answerMode";
import { usePronunciation } from "~/composables/user/pronunciation";
import { useCourseStore } from "~/store/course";
import { play, updateSource } from "./audio";

const { getPronunciationUrl } = usePronunciation();

let lastPronunciationUrl = "";
export function useCurrentStatementEnglishSound() {
  const courseStore = useCourseStore();

  watchEffect(() => {
    const word = courseStore.currentStatement?.english;
    const pronunciationUrl = getPronunciationUrl(word);
    if (lastPronunciationUrl !== pronunciationUrl) {
      updateSource(pronunciationUrl);
    }
    lastPronunciationUrl = pronunciationUrl;
  });

  const { audioRate, audioTimes } = useAnswerMode();
  return {
    playSound: (isQuestion?: boolean) => {
      if (isQuestion) {
        play(Number(audioTimes.value), Number(audioRate.value));
      } else {
        play();
      }
    },
  };
}

// 朗读每日一句
export function readOneSentencePerDayAloud(str: string) {
  const pronunciationUrl = getPronunciationUrl(str);
  updateSource(pronunciationUrl);
  play();
}
