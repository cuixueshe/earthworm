<template>
  <h2 class="pb-2">快捷键设置</h2>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>命令</th>
        <th>键绑定</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>play sound</td>
        <td>{{ shortcutKeyData.sound }}</td>
        <td>
          <n-button text @click="handleEdit('sound')"> 编辑 </n-button>
        </td>
      </tr>
      <tr>
        <td>show answer</td>
        <td>{{ shortcutKeyData.answer }}</td>
        <td>
          <n-button text @click="handleEdit('answer')"> 编辑 </n-button>
        </td>
      </tr>
    </tbody>
  </n-table>

  <dialog class="modal mt-[-8vh]" :open="showModal">
    <div ref="dialogBoxRef" class="modal-box max-w-[48rem]">
      <h3 class="font-bold text-center mb-4">
        先按所需的组合键，再按 Enter 键。
      </h3>
      <div class="h-8 leading-8 border border-solid border-fuchsia-500 rounded text-center">
        {{ shortcutKeyStr }}
      </div>
      <div class="text-center mt-2 text-xs">
        {{ shortcutKeyTip }}
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  useShortcutDialogMode,
  useShortcutKeyMode,
} from "~/composables/user/setting";

const { showModal, handleEdit, handleCloseDialog } = useShortcutDialogMode();
const { shortcutKeyStr, shortcutKeyTip, handleKeyup, shortcutKeyData } =
  useShortcutKeyMode();

let dialogBoxRef = ref<HTMLElement | null>(null);
function pointDialogOutside(e: MouseEvent) {
  if (!showModal.value) return;
  if (!dialogBoxRef.value?.contains(e.target as Node)) {
    handleCloseDialog();
  }
}

onMounted(() => {
  document.addEventListener("mouseup", pointDialogOutside);
  document.addEventListener("keyup", handleKeyup);
});
onUnmounted(() => {
  document.removeEventListener("mouseup", pointDialogOutside);
  document.removeEventListener("keyup", handleKeyup);
});
</script>
