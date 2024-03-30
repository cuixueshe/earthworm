<template>
  <div class="space-y-8 min-w-max">
    <section class="space-y-4">
      <h2 class="text-lg font-medium">快捷键设置</h2>
      <table class="table text-base">
        <thead>
          <tr class="text-base">
            <th class="w-[240px]">功能</th>
            <th class="text-center">快捷键</th>
            <th class="w-[300px] text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover">
            <td class="label-text">播放发音</td>
            <td class="text-center">{{ shortcutKeys.sound }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline btn-secondary"
                @click="handleEdit(SHORTCUT_KEY_TYPES.SOUND)"
              >
                编辑
              </button>
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">显示隐藏/答案预览</td>
            <td class="text-center">{{ shortcutKeys.answer }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline btn-secondary"
                @click="handleEdit(SHORTCUT_KEY_TYPES.ANSWER)"
              >
                编辑
              </button>
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">返回上个问题</td>
            <td class="text-center">{{ shortcutKeys.previous }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline btn-secondary"
                @click="handleEdit(SHORTCUT_KEY_TYPES.PREVIOUS)"
              >
                编辑
              </button>
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">跳过当前问题</td>
            <td class="text-center">{{ shortcutKeys.skip }}</td>
            <td class="text-center">
              <button
                class="btn btn-sm btn-outline btn-secondary"
                @click="handleEdit(SHORTCUT_KEY_TYPES.SKIP)"
              >
                编辑
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-medium">声音设置</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">开启键盘打字音效</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="keyboardSound"
                @change="toggleKeyboardSound"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">自动播放声音（答案页面）</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="autoPlaySound"
                @change="toggleAutoPlaySound"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">切换口音</td>
            <td class="w-[300px] text-center">
              <div class="mr-12 join">
                <input
                  v-for="lang in getPronunciationOptions()"
                  class="join-item btn btn-sm"
                  type="radio"
                  name="options"
                  :value="lang.value"
                  :aria-label="lang.label"
                  :checked="pronunciation === lang.value"
                  @change="togglePronunciation(lang.value as PronunciationType)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-medium">答题设置</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">显示每个单词长度</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="showWordsWidth"
                @change="toggleAutoWordsWidth"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">开启空格提交答案</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="useSpace"
                @change="toggleUseSpaceSubmitAnswer"
              />
            </td>
          </tr>
        </tbody>
      </table>
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
      <h3 class="mb-4 text-base font-bold text-center text-fuchsia-500">
        请先按下单键/组合键，通过回车键（Enter ⏎）来设置
      </h3>
      <div
        class="h-8 leading-8 text-center border border-solid rounded border-fuchsia-500"
      >
        {{ shortcutKeyStr }}
      </div>
      <div
        class="flex justify-center gap-2 mt-2 text-xs text-center"
        v-if="shortcutKeyTip"
      >
        <template
          v-for="(s, i) in shortcutKeyTip.split(' ')"
          :key="i"
        >
          <div class="px-2 py-1 rounded text-size-12 tip-btn">
            {{ s }}
          </div>
        </template>
      </div>
      <div
        v-if="hasSameShortcutKey"
        class="mt-4 text-xs text-center"
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
      <button @click="handleCloseDialog"></button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import {
  PronunciationType,
  usePronunciation,
} from "~/composables/user/pronunciation";
import {
  SHORTCUT_KEY_TYPES,
  useShortcutKeyMode,
} from "~/composables/user/shortcutKey";
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
  hasSameShortcutKey,
  handleEdit,
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

<style scoped>
.btn-outline.btn-secondary:hover,
.toggle-secondary:checked,
.btn:is(input[type="radio"]:checked) {
  @apply text-[#ffffff] border-fuchsia-500 bg-fuchsia-500;
}

.btn-outline.btn-secondary {
  @apply text-fuchsia-500 outline-fuchsia-500;
}
.tip-btn {
  @apply text-gray-500 bg-gray-100 dark:text-white dark:bg-gray-500;
}
</style>
