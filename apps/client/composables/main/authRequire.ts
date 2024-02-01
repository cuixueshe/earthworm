import { ref } from "vue";

const authRequireModalState = ref(false);

export function useAuthRequire() {
  function showAuthRequireModal() {
    authRequireModalState.value = true;
  }

  function hideAuthRequireModal() {
    authRequireModalState.value = false;
  }

  return {
    showAuthRequireModal,
    hideAuthRequireModal,
    authRequireModalState,
  };
}
