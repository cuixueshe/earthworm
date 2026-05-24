import { onMounted, ref } from "vue";

import { fetchDailySentence } from "~/api/tool";

const showModal = ref(false);
export function useSummary() {
  function showSummary() {
    showModal.value = true;
  }

  function hideSummary() {
    showModal.value = false;
  }

  return {
    showModal,
    showSummary,
    hideSummary,
  };
}

export const defaultEnSentence = "To be, or not to be, that is the question.";
export const defaultNativeSentence = "Sống hay chết, đó là vấn đề.";

const enSentence = ref(defaultEnSentence);
const nativeSentence = ref(defaultNativeSentence);
const hasLoadingDailySentence = ref(false);

export const resetSentenceLoading = () => (hasLoadingDailySentence.value = false);

export function useDailySentence() {
  const getDailySentence = async () => {
    if (!hasLoadingDailySentence.value) {
      hasLoadingDailySentence.value = true;
      const { en, zh } = await fetchDailySentence().catch((err) => {
        hasLoadingDailySentence.value = false;
        return Promise.reject(err);
      });
      enSentence.value = en;
      nativeSentence.value = zh;
    }
  };

  onMounted(() => {
    getDailySentence();
  });

  return {
    enSentence,
    nativeSentence,
    getDailySentence,
  };
}
