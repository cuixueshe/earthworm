<template>
  <dialog class="modal" :open="show">
    <div class="modal-box">
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
interface IMessageBoxProps {
  show: boolean;
  title: string;
  content: string;
  confirmBtnText: string;
  cancelBtnText: string;
}

withDefaults(defineProps<IMessageBoxProps>(), {
  show: false,
  title: "Tips",
  content: "Are you sure?",
  confirmBtnText: "Confirm",
  cancelBtnText: "Cancel",
});
const emits = defineEmits(["confirm", "cancel"]);

function handleCancel() {
  emits("cancel", false);
}
function handleConfirm() {
  emits("confirm", true);
}
</script>
