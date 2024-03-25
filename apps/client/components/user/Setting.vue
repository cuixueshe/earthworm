<template>
  <div class="space-y-4">
    <section>
      <h2 class="text-lg mb-2">快捷键设置</h2>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>命令</th>
              <th>键绑定</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>播放发音</td>
              <td>{{ shortcutKeys.sound }}</td>
              <td>
                <button
                  class="btn btn-ghost"
                  @click="handleEdit('sound')"
                >
                  编辑
                </button>
              </td>
            </tr>
            <tr>
              <td>切换答题/答案页面</td>
              <td>{{ shortcutKeys.answer }}</td>
              <td>
                <button
                  class="btn btn-ghost"
                  @click="handleEdit('answer')"
                >
                  编辑
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-lg mb-2">声音设置</h2>
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">开启键盘打字音效</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            :checked="keyboardSound"
            @change="toggleKeyboardSound"
          />
        </label>
      </div>
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">自动播放声音（答案页面）</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            :checked="autoPlaySound"
            @change="toggleAutoPlaySound"
          />
        </label>
      </div>
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">切换口音</span>
          <select
            class="select"
            v-model="pronunciation"
            @change="togglePronunciation"
          >
            <option
              v-for="item in getPronunciationOptions()"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>
      </div>
    </section>

    <section>
      <h2 class="text-lg mb-2">答题设置</h2>
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">显示每个单词长度</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            :checked="showWordsWidth"
            @change="toggleAutoWordsWidth"
          />
        </label>
      </div>
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">开启空格提交答案</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
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
import { usePronunciation } from "~/composables/user/pronunciation";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import {
  useAutoPronunciation,
  useKeyboardSound,
} from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";

const dialogBoxRef = ref<HTMLElement | null>(null);
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
const { autoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();
const {
  pronunciation,
  // 发音配置列表
  getPronunciationOptions,
  togglePronunciation,
} = usePronunciation();
const { showWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
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

onMounted(() => {
  document.addEventListener("mouseup", pointDialogOutside);
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("mouseup", pointDialogOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>
