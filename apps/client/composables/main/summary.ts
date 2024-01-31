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

const enSentence = ref("To be, or not to be, that is the question.");
const zhSentence = ref("生存还是毁灭，这是一个问题。");
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

  onMounted(() => {
    getDailySentence();
  });

  return {
    enSentence,
    zhSentence,
  };
}
