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

  <dialog id="shortcutDialog" class="modal mt-[-8vh]">
    <div class="modal-box max-w-[48rem]">
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
    <form method="dialog" class="modal-backdrop">
      <button @click="handleCloseDialog">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import {
  useShortcutDialogMode,
  useShortcutKeyMode,
} from "~/composables/user/setting";

const { handleEdit, handleCloseDialog } = useShortcutDialogMode();
const { shortcutKeyStr, shortcutKeyTip, handleKeyup, shortcutKeyData } =
  useShortcutKeyMode();

onMounted(() => {
  document.addEventListener("keyup", handleKeyup);
});
onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyup);
});
</script>
