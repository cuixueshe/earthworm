<template>
  <div class="flex gap-x-2 text-sm mt-3">
    <button
      class="rounded-sm px-2 bg-gray-600 text-white dark:text-gray-900"
      @click="handler"
    >
      {{ text }}
    </button>
    <div class="text-gray-600">- {{ description }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  description: string;
}

defineProps<Props>();

const emit = defineEmits(["click"]);

function handler() {
  emit("click");
}
</script>

<style scoped></style>
