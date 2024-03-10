import { ref, watch, computed } from "vue";
export interface IMessageBoxProps {
  isShowModal: boolean;
  content?: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

export interface EmitsType {
  (event: "update:isShowModal", isShow: boolean): void;
  (event: "confirm"): void;
}

export function useMessageBoxModal(props: IMessageBoxProps, emits: EmitsType) {
  let dialogBoxRef = ref<HTMLElement | null>(null);

  function handleConfirm() {
    handleClose()
    emits("confirm");
  }

  function handleClose() {
    isShow.value = false;
  }

  const isShow = computed({
    get() {
      return props.isShowModal;
    },
    set(val) {
      emits("update:isShowModal", val);
    },
  });

  function pointDialogOutside(e: MouseEvent) {
    if (!isShow.value) return;
    if (!dialogBoxRef.value?.contains(e.target as Node)) {
      isShow.value = false;
    }
  }

  watch(isShow, (val) => {
    if (val) {
      document.addEventListener("mouseup", pointDialogOutside);
    } else {
      document.removeEventListener("mouseup", pointDialogOutside);
    }
  });

  return {
    dialogBoxRef,
    isShow,
    handleConfirm,
    handleClose
  };
}
