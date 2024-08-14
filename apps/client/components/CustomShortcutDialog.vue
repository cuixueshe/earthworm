<template>
  <UModal
    v-model="showModal"
    @close="handleCloseDialog"
  >
    <UContainer>
      <h3 class="mb-4 text-center text-base font-bold">
        请先按下单键/组合键，通过回车键（Enter ⏎）来设置
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
        已有相同的按键绑定，请重新设置
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
