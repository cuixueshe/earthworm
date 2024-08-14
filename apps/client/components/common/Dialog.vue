<script lang="ts" setup>
import { useModal } from "#imports";

defineProps({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  showCancel: {
    type: Boolean,
    default: false,
  },
  cancelText: {
    type: String,
    default: "取消",
  },
  showConfirm: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "确认",
  },
});

const modal = useModal();
const emit = defineEmits(["cancel", "confirm"]);

async function onCancel() {
  await modal.close();
  emit("cancel");
}
async function onConfirm() {
  await modal.close();
  emit("confirm");
}
</script>

<template>
  <UModal :ui="{ width: 'w-full sm:max-w-lg' }">
    <div class="flex h-52 flex-col justify-between p-6 text-gray-900 dark:text-white">
      <h2 class="mb-8 text-2xl font-bold">{{ title }}</h2>
      <p class="mb-8 text-base text-gray-700 dark:text-gray-300">
        {{ content }}
      </p>
      <div class="flex w-full justify-end space-x-4">
        <UButton
          v-if="showCancel"
          color="gray"
          class="px-6"
          @click="onCancel"
        >
          {{ cancelText || "取消" }}
        </UButton>
        <UButton
          v-if="showConfirm"
          class="px-6"
          @click="onConfirm"
        >
          {{ confirmText || "确认" }}
        </UButton>
      </div>
    </div>
  </UModal>
</template>
