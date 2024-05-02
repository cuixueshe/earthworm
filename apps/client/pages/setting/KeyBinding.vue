<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";

import { parseShortcutKeys } from "~/utils/keyboardShortcuts";

const props = defineProps<{
  showModal: boolean;
  shortcutKeyStr: string;
  shortcutKeyTip: string;
  hasSameShortcutKey: boolean;
}>();

defineEmits(["close"]);

const modalRef = ref<HTMLDialogElement | null>(null);

const keys = computed(() => parseShortcutKeys(props.shortcutKeyStr));

watchEffect(() => {
  if (props.showModal) {
    modalRef.value?.showModal();
  } else {
    modalRef.value?.close();
  }
});
</script>

<template>
  <dialog
    ref="modalRef"
    class="modal"
  >
    <div class="modal-box mt-[-8vh] min-h-[156px] max-w-[48rem]">
      <h3 class="mb-4 text-center text-base font-bold text-fuchsia-500">
        请先按下单键/组合键，通过回车键（Enter ⏎）来设置
      </h3>
      <div class="h-8 rounded border border-solid border-fuchsia-500 text-center leading-8">
        {{ shortcutKeyStr }}
      </div>
      <div
        v-if="shortcutKeyTip"
        class="mt-2 flex justify-center gap-2 text-xs"
      >
        <div
          v-for="key in keys"
          class="kbd"
        >
          {{ key }}
        </div>
      </div>
      <div
        v-if="hasSameShortcutKey"
        class="mt-4 text-center text-xs"
        :class="'text-[rgba(136,136,136,1)]'"
      >
        已有相同的按键绑定，请重新设置
      </div>
    </div>

    <!-- click outside to close -->
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button @click="$emit('close')"></button>
    </form>
  </dialog>
</template>
