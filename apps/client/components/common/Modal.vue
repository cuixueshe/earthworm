<script lang="ts" setup>
import { ref, watchEffect } from "vue";

defineOptions({ name: "Modal" });

/**
 * @param {boolean} showModal          - 必传，是否显示弹窗，默认不显示
 * @param {boolean} modal              - 可选，是否显示遮罩层，默认不显示
 * @param {string}  modalColor         - 可选，设置遮罩层背景色，默认 30% 黑色透明
 * @param {string}  offsetTop          - 可选，距离顶部的偏移量，默认 -8vh，因为默认使用 modal-middle 只能往上走来调整
 * @param {string}  twClass            - 可选，给 modal-box 补充一些 Tailwind CSS
 * @param {boolean} closeOnClickModal  - 可选，是否允许点击遮罩层关闭弹窗，默认不允许
 */
const props = withDefaults(
  defineProps<{
    showModal: boolean;
    modal?: boolean;
    modalColor?: string;
    offsetTop?: string;
    twClass?: string;
    closeOnClickModal?: boolean;
  }>(),
  {
    showModal: false,
    modal: false,
    modalColor: "rgba(0, 0, 0, 0.3)",
    offsetTop: "-8vh",
    twClass: "",
    closeOnClickModal: false,
  },
);

const emits = defineEmits(["close"]);

const modalRef = ref<HTMLDialogElement | null>(null);

// 检查 modalRef 是否存在
function checkModalRef() {
  return !!modalRef.value;
}

function show() {
  modalRef.value?.show();
}

function close() {
  modalRef.value?.close();
}

function showModal() {
  modalRef.value?.showModal();
}

function handleClick(e: MouseEvent) {
  if (!checkModalRef()) return;

  if (props.closeOnClickModal && e.target === modalRef.value) {
    handleClose();
  }
}

function handleOpen() {
  if (!checkModalRef()) return;

  props.modal ? showModal() : show();
}

function handleClose() {
  if (!checkModalRef()) return;

  close();
  emits("close");
}

watchEffect(() => {
  if (!checkModalRef()) return;

  // 处理外层传入的 showModal 改变时，控制弹框的显示/隐藏
  if (props.showModal) {
    props.modal ? showModal() : show();
  } else {
    close();
  }
});

// 外部可以设置 ref 后调用 open/close 方法控制弹框
defineExpose({
  open: handleOpen,
  close: handleClose,
});
</script>

<template>
  <dialog
    ref="modalRef"
    class="modal"
    @click="handleClick"
  >
    <div
      class="modal-box bg-white dark:bg-gray-800"
      :class="twClass"
      :style="{ marginTop: offsetTop }"
    >
      <slot />
    </div>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background-color: v-bind(modalColor);
}
</style>
