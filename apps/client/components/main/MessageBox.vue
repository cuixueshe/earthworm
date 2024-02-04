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
import { ref, watch } from "vue";

interface IMessageBoxProps {
  modelValue: boolean;
  content?: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

const props = withDefaults(defineProps<IMessageBoxProps>(), {
  modelValue: false,
  title: "Tips",
  content: "Are you sure?",
  confirmBtnText: "Confirm",
  cancelBtnText: "Cancel",
});
const emits = defineEmits(["update:modelValue", "confirm"]);

function handleCancel() {
  emits("update:modelValue", false);
}
function handleConfirm() {
  emits("update:modelValue", true);
  emits("confirm");
}

let dialogBoxRef = ref<HTMLElement | null>(null);
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
</script>
