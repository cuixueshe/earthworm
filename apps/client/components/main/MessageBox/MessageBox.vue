<template>
  <dialog
    :open="isShow"
    class="invisible modal"
  >
    <div
      ref="dialogBoxRef"
      class="modal-box"
    >
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4">{{ content }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button
            @click="handleCancel"
            class="btn cancel"
          >
            {{ cancelBtnText }}
          </button>
        </form>
        <button
          v-if="confirmBtnText"
          class="btn confirm"
          @click="handleConfirm"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {
  useMessageBoxModal,
  type EmitsType,
  type IMessageBoxProps,
} from "~/composables/messageBox/modal";

const props = withDefaults(defineProps<IMessageBoxProps>(), {
  isShowModal: false,
  title: "提示",
  content: "你确定吗?",
  confirmBtnText: "确定",
  cancelBtnText: "取消",
});

const emits = defineEmits<EmitsType>();

const { dialogBoxRef, isShow, handleConfirm, handleCancel } =
  useMessageBoxModal(props, emits);
</script>
