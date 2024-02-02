import { ref } from "vue";

const isShowModal = ref(false);

export function useModalBox() {
  function handleOpenModal() {
    isShowModal.value = true;
  }
  function handleCloseModal() {
    isShowModal.value = false;
  }

  function handleConfirmModal() {
    isShowModal.value = false;
  }

  return {
    isShowModal,
    handleCloseModal,
    handleConfirmModal,
    handleOpenModal,
  };
}
