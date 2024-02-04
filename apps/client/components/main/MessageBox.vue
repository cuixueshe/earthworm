<template>
  <dialog class="modal" :open="props.modelValue">
    <div ref="dialogBoxRef" class="modal-box">
      <h3 class="font-bold text-lg">{{ title }}</h3>
      <p class="py-4">{{ content }}</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="handleCancel">{{ cancelBtnText }}</button>
        </form>
        <button class="btn" @click="handleConfirm">{{ confirmBtnText }}</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, } from "vue";
import { useMessageBox, type IMessageBoxProps, type MessageBoxEmit } from '../../composables/main/messageBox';

const props = withDefaults(defineProps<IMessageBoxProps>(), {
  modelValue: false,
  title: "Tips",
  content: "Are you sure?",
  confirmBtnText: "Confirm",
  cancelBtnText: "Cancel",
});
const emit = defineEmits<MessageBoxEmit>();

const dialogBoxRef = ref<HTMLElement | null>(null);
const { handleCancel, handleConfirm } = useMessageBox(props, emit, dialogBoxRef)

</script>
