import { watch, type Ref } from "vue";

export interface IMessageBoxProps {
  modelValue: boolean;
  content?: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

export interface MessageBoxEmit {
  (e: "update:modelValue", show: boolean): void;
  (e: "confirm"): void;
}

export function useMessageBox(
  props: IMessageBoxProps,
  emit: MessageBoxEmit,
  dialogBoxRef: Ref<HTMLElement | null>
) {
  function handleCancel() {
    emit("update:modelValue", false);
  }
  function handleConfirm() {
    emit("update:modelValue", true);
    emit("confirm");
  }

  function pointDialogOutside(e: MouseEvent) {
    if (!props.modelValue) return;
    if (!dialogBoxRef.value?.contains(e.target as Node)) {
      handleCancel();
    }
  }

  watch(
    () => props.modelValue,
    (isShow) => {
      if (isShow) {
        document.addEventListener("mouseup", pointDialogOutside);
      } else {
        document.removeEventListener("mouseup", pointDialogOutside);
      }
    }
  );

  return {
    handleCancel,
    handleConfirm,
  };
}
