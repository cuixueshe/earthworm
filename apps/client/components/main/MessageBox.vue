<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    showModal: boolean;
    modal?: boolean;
    title?: string;
    content?: string;
    cancelBtnText?: string;
    confirmBtnText?: string;
  }>(),
  {
    showModal: false,
    modal: true,
    title: "提示",
    content: "你确定吗?",
    cancelBtnText: "取消",
    confirmBtnText: "",
  },
);
const emits = defineEmits(["confirm", "update:showModal"]);

// 可以在这个地方直接更新外层 showModal
const isShowModal = useVModel(props, "showModal", emits);

function handleCancel() {
  isShowModal.value = false;
}

function handleConfirm() {
  emits("confirm");
  handleCancel();
}
</script>

<template>
  <CommonModal
    :show-modal="isShowModal"
    :modal="modal"
    :close-on-click-modal="true"
    @close="handleCancel"
  >
    <h3 class="text-lg font-bold">{{ title }}</h3>
    <p class="py-4">{{ content }}</p>
    <div class="modal-action">
      <button
        class="btn mr-2"
        @click="handleCancel"
      >
        {{ cancelBtnText }}
      </button>
      <!-- TODO: 后续看看有没有更好的方案 -->
      <button
        v-if="confirmBtnText"
        class="btn"
        @click="handleConfirm"
      >
        {{ confirmBtnText }}
      </button>
    </div>
  </CommonModal>
</template>
