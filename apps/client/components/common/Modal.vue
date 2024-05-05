<script lang="ts" setup>
import { ref, watchEffect } from "vue";

defineOptions({ name: "Modal" });

/**
 * @param {boolean} showModal - 是否显示弹窗
 * @param {boolean} modal - 是否使用 showModal
 * @param {boolean} closeOnClickModal - 点击遮罩层是否关闭弹窗
 * @param {string} modalColor - 遮罩背景色
 */
const props = withDefaults(
  defineProps<{
    showModal: boolean;
    modal?: boolean;
    closeOnClickModal?: boolean;
    modalColor?: string;
    offset?: number;
  }>(),
  {
    showModal: false,
    modal: false,
    closeOnClickModal: false,
    modalColor: "rgba(0, 0, 0, 0.3)",
    offset: 0,
  },
);

const emits = defineEmits(["close"]);

const modalRef = ref<HTMLDialogElement | null>(null);

const onClick = (e: MouseEvent) => {
  if (!modalRef.value) return;
  if (props.closeOnClickModal && e.target === modalRef.value) {
    onClose();
  }
};

const onOpen = () => {
  if (!modalRef.value) return;

  props.modal ? modalRef.value.showModal() : modalRef.value.show();
};

const onClose = () => {
  if (!modalRef.value) return;

  modalRef.value?.close();
  emits("close");
};

watchEffect(() => {
  if (!modalRef.value) return;

  if (props.showModal) {
    props.modal ? modalRef.value.showModal() : modalRef.value.show();
  } else {
    modalRef.value.close();
  }
});

defineExpose({
  open: onOpen,
  close: onClose,
});
</script>

<template>
  <dialog
    ref="modalRef"
    class="modal mt-[-8vh]"
    :style="{
      marginTop: `${offset}px`,
    }"
    @click="onClick"
  >
    <slot />
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: v-bind(modalColor);
}
</style>
