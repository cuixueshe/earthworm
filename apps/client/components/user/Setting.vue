<template>
  <div class="min-w-max space-y-8">
    <section class="space-y-4">
      <h2 class="text-lg font-medium">个人信息设置</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">昵称</td>
            <td class="w-[300px] text-center">
              <div class="join mr-12">
                <input
                  class="btn join-item btn-sm"
                  type="text"
                  name="username"
                  pattern="请输入用户名称"
                  v-model="userName"
                  @keyup.enter="updateUserName"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="space-y-4">
      <h2 class="text-lg font-medium">游戏模式</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">模式</td>
            <td class="w-[300px] text-center">
              <div class="join mr-12">
                <input
                  v-for="mode in getGameModeOptions()"
                  class="btn join-item btn-sm"
                  type="radio"
                  name="gameMode"
                  :value="mode.value"
                  :aria-label="mode.label"
                  :checked="currentGameMode === mode.value"
                  @change="toggleGameMode(mode.value as GameMode)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

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
          <template v-for="item in shortcutKeyBindList">
            <tr class="hover">
              <td class="label-text">{{ item.label }}</td>
              <td class="text-center">
                <div class="flex items-center justify-center gap-2 text-center text-xs">
                  <div
                    class="kbd"
                    v-for="key in parseShortcutKeys(shortcutKeys[item.type])"
                  >
                    {{ key }}
                  </div>
                </div>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-outline btn-secondary btn-sm"
                  @click="handleEdit(item.type)"
                >
                  编辑
                </button>
              </td>
            </tr>
          </template>
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
              <div class="join mr-12">
                <input
                  v-for="lang in getPronunciationOptions()"
                  class="btn join-item btn-sm"
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
          <tr class="hover">
            <td class="label-text">答题正确后自动下一题</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="autoNextQuestion"
                @change="toggleAutoQuestion"
              />
            </td>
          </tr>

          <tr class="hover">
            <td class="label-text">自动显示答案（输错三次）</td>
            <td class="w-[300px] text-center">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="showErrorTip"
                @change="toggleShowErrorTip"
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
      class="modal-box min-h-[156px] max-w-[48rem]"
    >
      <h3 class="mb-4 text-center text-base font-bold text-fuchsia-500">
        请先按下单键/组合键，通过回车键（Enter ⏎）来设置
      </h3>
      <div class="h-8 rounded border border-solid border-fuchsia-500 text-center leading-8">
        {{ shortcutKeyStr }}
      </div>
      <div
        v-if="shortcutKeyTip"
        class="mt-2 flex justify-center gap-2 text-center text-xs"
      >
        <div
          v-for="key in parseShortcutKeys(shortcutKeyTip)"
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
      <button @click="handleCloseDialog"></button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useErrorTip } from "~/composables/user/errorTip";
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import { useUserInfo } from "~/composables/user/info";
import { PronunciationType, usePronunciation } from "~/composables/user/pronunciation";
import { SHORTCUT_KEY_TYPES, useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useAutoPronunciation, useKeyboardSound } from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { useUserStore } from "~/store/user";
import { parseShortcutKeys } from "~/utils/keyboardShortcuts";

const dialogBoxRef = ref<HTMLElement | null>(null);
const userStore = useUserStore();
const userName = userStore.userNameGetter;
console.log("%c Line:249 🍺 userStore", "color:#2eafb0", userStore);
const { autoNextQuestion, toggleAutoQuestion } = useAutoNextQuestion();
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
const { autoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();
const { updateUserName } = useUserInfo();
const {
  pronunciation,
  // 发音配置列表
  getPronunciationOptions,
  togglePronunciation,
} = usePronunciation();
const { showWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { showErrorTip, toggleShowErrorTip } = useErrorTip();
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

const { getGameModeOptions, currentGameMode, toggleGameMode } = useGameMode();

const shortcutKeyBindList = [
  {
    label: "播放发音",
    type: SHORTCUT_KEY_TYPES.SOUND,
  },
  {
    label: "显示隐藏/答案预览",
    type: SHORTCUT_KEY_TYPES.ANSWER,
  },
  {
    label: "返回上个问题",
    type: SHORTCUT_KEY_TYPES.PREVIOUS,
  },
  {
    label: "跳过当前问题",
    type: SHORTCUT_KEY_TYPES.SKIP,
  },
];

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
  @apply border-fuchsia-500 bg-fuchsia-500 text-[#ffffff];
}

.btn-outline.btn-secondary {
  @apply text-fuchsia-500 outline-fuchsia-500;
}
</style>
