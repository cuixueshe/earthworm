import { ref } from "vue";

const showModal = ref(false);
export function useRankModal() {
  function show() {
    showModal.value = true;
  }

  function hide() {
    showModal.value = false;
  }

  return {
    showModal,
    show,
    hide,
  };
}
