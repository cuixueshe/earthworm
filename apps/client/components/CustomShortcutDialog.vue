<template>
  <UModal
    v-model="showModal"
    @close="handleCloseDialog"
  >
    <UContainer>
      <h3 class="mb-4 text-center text-base font-bold">
        Nhấn phím đơn hoặc tổ hợp phím, sau đó nhấn Enter (Enter ⏎) để cài đặt
      </h3>
      <div class="h-8 rounded border border-solid text-center leading-8">
        {{ shortcutKeyStr }}
      </div>
      <div class="mt-2 flex h-8 justify-center gap-0.5 text-center">
        <div v-if="shortcutKeyTip">
          <UKbd v-for="key in parseShortcutKeys(shortcutKeyTip)">
            {{ key }}
          </UKbd>
        </div>
      </div>
      <div
        v-if="hasSameShortcutKey"
        class="mt-4 text-center text-xs"
        :class="'text-[rgba(136,136,136,1)]'"
      >
        Đã có phím tắt giống nhau, vui lòng cài đặt lại
      </div>
    </UContainer>
  </UModal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { parseShortcutKeys } from "~/utils/keyboardShortcuts";

const {
  showModal,
  shortcutKeyStr,
  shortcutKeyTip,
  hasSameShortcutKey,
  handleCloseDialog,
  handleKeydown,
} = useShortcutKeyMode();

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped></style>
