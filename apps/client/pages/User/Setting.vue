<template>
  <div
    class="mx-auto my-8 w-full max-w-screen-lg space-y-8 rounded-lg bg-base-100 px-6 py-8 shadow-even-lg dark:bg-gray-900 dark:shadow-gray-700 md:px-12"
  >
    <section>
      <h2 class="text-xl font-medium">游戏模式</h2>
      <table class="table text-base">
        <tbody>
          <tr class="hover">
            <td class="label-text">模式</td>
            <td class="text-right">
              <div class="join">
                <input
                  v-for="mode in getGamePlayModeOptions()"
                  class="btn join-item btn-sm"
                  type="radio"
                  name="gameMode"
                  :value="mode.value"
                  :aria-label="mode.label"
                  :checked="currentGamePlayMode === mode.value"
                  @change="toggleGamePlayMode(mode.value as GamePlayMode)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="text-xl font-medium">快捷键设置</h2>
      <table class="table text-base">
        <thead>
          <tr class="text-base">
            <th class="">功能</th>
            <th class="w-1/6 text-center">快捷键</th>
            <th class="w-2/6 pr-6 text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in shortcutKeyBindList">
            <tr class="hover">
              <td class="label-text">{{ item.label }}</td>
              <td class="text-center">
                <div class="flex justify-center gap-0.5 text-center">
                  <UKbd v-for="key in parseShortcutKeys(shortcutKeys[item.type])">
                    {{ key }}
                  </UKbd>
                </div>
              </td>
              <td class="text-right">
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

    <section>
      <h2 class="text-xl font-medium">声音设置</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">开启键盘打字音效</td>
            <td class="text-right">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="keyboardSound"
                @change="toggleKeyboardSound"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">答案页面自动播放声音</td>
            <td class="text-right">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="autoPlaySound"
                @change="toggleAutoPlaySound"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">答题时自动播放声音</td>
            <td class="text-right">
              <input
                type="checkbox"
                class="toggle toggle-secondary"
                :checked="autoPlayEnglish"
                @change="toggleAutoPlayEnglish"
              />
            </td>
          </tr>
          <tr class="hover">
            <td class="label-text">切换口音</td>
            <td class="text-right">
              <div class="join">
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

    <section>
      <h2 class="text-xl font-medium">答题设置</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">显示每个单词长度</td>
            <td class="text-right">
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
            <td class="text-right">
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
            <td class="text-right">
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
            <td class="text-right">
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
  <CustomShortcutDialog />
</template>

<script setup lang="ts">
import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useErrorTip } from "~/composables/user/errorTip";
import { GamePlayMode, useGamePlayMode } from "~/composables/user/gamePlayMode";
import { PronunciationType, usePronunciation } from "~/composables/user/pronunciation";
import { SHORTCUT_KEY_TYPES, useShortcutKeyMode } from "~/composables/user/shortcutKey";
import {
  useAutoPlayEnglish,
  useAutoPronunciation,
  useKeyboardSound,
} from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { parseShortcutKeys } from "~/utils/keyboardShortcuts";

const { autoNextQuestion, toggleAutoQuestion } = useAutoNextQuestion();
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
const { autoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();
const { autoPlayEnglish, toggleAutoPlayEnglish } = useAutoPlayEnglish();
const {
  pronunciation,
  // 发音配置列表
  getPronunciationOptions,
  togglePronunciation,
} = usePronunciation();
const { showWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { showErrorTip, toggleShowErrorTip } = useErrorTip();
const { shortcutKeys, handleEdit } = useShortcutKeyMode();

const { getGamePlayModeOptions, currentGamePlayMode, toggleGamePlayMode } = useGamePlayMode();

const shortcutKeyBindList = [
  {
    label: "播放发音",
    type: SHORTCUT_KEY_TYPES.SOUND,
  },
  {
    label: "显示隐藏/答案预览/再来一次",
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
  {
    label: "标记内容已经掌握",
    type: SHORTCUT_KEY_TYPES.MASTERED,
  },
  {
    label: "暂停游戏/继续游戏",
    type: SHORTCUT_KEY_TYPES.PAUSE,
  },
];
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

section > h2 {
  @apply border-b pb-4;
}
</style>
