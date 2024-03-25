<template>
  <div class="space-y-4">
    <section>
      <h2 class="text-lg mb-2">快捷键设置</h2>
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
            <td>播放发音</td>
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
            <td>切换答题/答案页面</td>
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
<<<<<<< HEAD
    </section>

    <section>
      <h2 class="text-lg">是否展示每个单词长度</h2>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">是</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            :checked="autoShowWordsWidth"
            @change="toggleAutoWordsWidth"
=======
      <div class="form-control w-80">
        <label class="cursor-pointer label">
          <span class="label-text">切换口音</span>
          <n-select
            v-model:value="pronunciation"
            :options="getPronunciationOptions()"
            :on-update-value="togglePronunciation"
            class="w-[90px]"
>>>>>>> 012b59c44dec1ff5709a908841d0d70e8a1c9ccd
          />
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

    <section>
      <h2 class="text-lg">答题模式</h2>
      <div class="form-control w-52">
        <label class="cursor-pointer label">
          <span
            :class="[
              'label-text',
              listeningMode ? 'text-gray-500' : 'text-fuchsia-500',
            ]"
            >普通模式</span
          >
          <input
            type="checkbox"
            class="toggle toggle-primary"
            :checked="listeningMode"
            @change="toggleMode"
          />
          <span
            :class="[
              'label-text',
              listeningMode ? 'text-fuchsia-500' : 'text-gray-500',
            ]"
            >听力模式</span
          >
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
import { useAnswerMode } from "~/composables/user/answerMode";
import { usePronunciation } from "~/composables/user/pronunciation";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useKeyboardSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";

const dialogBoxRef = ref<HTMLElement | null>(null);
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
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
const { listeningMode, toggleMode } = useAnswerMode();

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
