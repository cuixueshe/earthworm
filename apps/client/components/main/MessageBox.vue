<template>
  <dialog class="modal invisible" :open="isShow">
    <div ref="dialogBoxRef" class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ content }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="isShow = false">{{ cancelBtnText }}</button>
        </form>
        <button v-if="confirmBtnText" class="btn" @click="handleConfirm">{{ confirmBtnText }}</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { type IMessageBoxProps, type EmitsType, useMessageBoxModal } from '~/composables/messageBox/modal'


const props = withDefaults(defineProps<IMessageBoxProps>(), {
  isShowModal: false,
  title: "Tips",
  content: "Are you sure?",
  confirmBtnText: "Confirm",
  cancelBtnText: "Cancel",
});

const emits = defineEmits<EmitsType>();

const { dialogBoxRef, isShow, handleConfirm } = useMessageBoxModal(props, emits)

</script>
