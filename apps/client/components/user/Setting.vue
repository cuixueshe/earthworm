<template>
  <div class="space-y-4">
    <section>
      <h2 class="text-lg">快捷键设置</h2>
      <n-table
        :bordered="false"
        :single-line="false"
      >
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
            <td>{{ shortcutKeys.sound }}</td>
            <td>
              <n-button
                text
                @click="handleEdit('sound')"
              >
                编辑
              </n-button>
            </td>
          </tr>
          <tr>
            <td>show answer</td>
            <td>{{ shortcutKeys.answer }}</td>
            <td>
              <n-button
                text
                @click="handleEdit('answer')"
              >
                编辑
              </n-button>
            </td>
          </tr>
        </tbody>
      </n-table>
    </section>

    <section>
      <h2 class="text-lg">声音设置</h2>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">自动播放</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            :checked="autoPlaySound"
            @change="toggleAutoPlaySound"
          />
        </label>
      </div>
    </section>

    <section>
      <h2>是否展示每个单词长度</h2>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">是</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            :checked="autoShowWordsWidth"
            @change="toggleAutoWordsWidth"
          />
        </label>
      </div>
    </section>

    <section>
      <h2 class="text-lg">提交设置</h2>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">使用空格</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            :checked="useSpace"
            @change="toggleUseSpaceSubmitAnswer"
          />
        </label>
      </div>
    </section>
  </div>

  <dialog
    class="modal mt-[-8vh]"
    :open="showModal"
  >
    <div
      ref="dialogBoxRef"
      class="modal-box max-w-[48rem] min-h-[156px]"
    >
      <h3 class="mb-4 text-center text-base font-bold text-fuchsia-500">
        请先按下单键/组合键，通过回车键（Enter ⏎）来设置
      </h3>
      <div
        class="h-8 leading-8 border border-solid border-fuchsia-500 rounded text-center"
      >
        {{ shortcutKeyStr }}
      </div>
      <div class="text-center mt-2 text-xs">
        {{ shortcutKeyTip }}
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useAutoSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";

const dialogBoxRef = ref<HTMLElement | null>(null);
const {
  showModal,
  shortcutKeys,
  shortcutKeyStr,
  shortcutKeyTip,
  handleEdit,
  handleCloseDialog,
  handleKeydown,
} = useShortcutKeyMode();

function pointDialogOutside(e: MouseEvent) {
  if (!showModal.value) return;
  if (!dialogBoxRef.value?.contains(e.target as Node)) {
    handleCloseDialog();
  }
}

const { autoPlaySound, toggleAutoPlaySound } = useAutoSound();
const { autoShowWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();

onMounted(() => {
  document.addEventListener("mouseup", pointDialogOutside);
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("mouseup", pointDialogOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>
