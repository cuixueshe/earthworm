<template>
  <dialog
    :open="isShow"
    class="modal invisible"
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
            class="cancel btn"
          >
            {{ cancelBtnText }}
          </button>
        </form>
        <button
          v-if="confirmBtnText"
          class="confirm btn"
          @click="handleConfirm"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type { EmitsType, IMessageBoxProps } from "~/composables/messageBox/modal";
import { useMessageBoxModal } from "~/composables/messageBox/modal";

const props = withDefaults(defineProps<IMessageBoxProps>(), {
  isShowModal: false,
  title: "提示",
  content: "你确定吗?",
  confirmBtnText: "确定",
  cancelBtnText: "取消",
});

const emits = defineEmits<EmitsType>();

const { dialogBoxRef, isShow, handleConfirm, handleCancel } = useMessageBoxModal(props, emits);
</script>
