import { ref, onMounted } from "vue";
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

export const defaultEnSentence = 'To be, or not to be, that is the question.'
export const defaultZhSentence = '生存还是毁灭，这是一个问题。'

const enSentence = ref(defaultEnSentence);
const zhSentence = ref(defaultZhSentence);
const setenceLoading = ref(false);
export function useDailySentence() {
  const getDailySentence = async () => {
    if (!setenceLoading.value) {
      const { en, zh } = await fetchDailySentence();
      enSentence.value = en;
      zhSentence.value = zh;
      setenceLoading.value = true;
    }
  };

  const resetSentenceLoading = () => (setenceLoading.value = false)

  onMounted(() => {
    getDailySentence();
  });

  return {
    enSentence,
    zhSentence,
    getDailySentence,
    resetSentenceLoading
  };
}
