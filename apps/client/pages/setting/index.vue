<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";

import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useErrorTip } from "~/composables/user/errorTip";
import { useGameMode } from "~/composables/user/gameMode";
import { usePronunciation } from "~/composables/user/pronunciation";
import { SHORTCUT_KEY_TYPES, useShortcutKeyMode } from "~/composables/user/shortcutKey";
import {
  useAutoPlayEnglish,
  useAutoPronunciation,
  useKeyboardSound,
} from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";
import { parseShortcutKeys } from "~/utils/keyboardShortcuts";
import SettingItem from "./Item.vue";
import KeyBinding from "./KeyBinding.vue";

const {
  showModal,
  shortcutKeys,
  handleKeydown,
  handleEdit,
  shortcutKeyStr,
  shortcutKeyTip,
  hasSameShortcutKey,
  handleCloseDialog,
} = useShortcutKeyMode();
const { pronunciation, getPronunciationOptions, togglePronunciation } = usePronunciation();
const { autoNextQuestion, toggleAutoQuestion } = useAutoNextQuestion();
const { autoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
const { getGameModeOptions, currentGameMode, toggleGameMode } = useGameMode();
const { autoPlayEnglish, toggleAutoPlayEnglish } = useAutoPlayEnglish();
const { showWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { showErrorTip, toggleShowErrorTip } = useErrorTip();

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

function getBindingKeys(type: SHORTCUT_KEY_TYPES) {
  return parseShortcutKeys(shortcutKeys.value[type]);
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="mx-auto my-8 w-full max-w-screen-lg space-y-8 rounded-xl bg-base-100 px-6 py-8 shadow-even-xl dark:shadow-purple-500/30 min-[800px]:px-12"
  >
    <section class="border-b">
      <h2 class="section-title">游戏模式</h2>
      <SettingItem
        mode="radio"
        title="模式"
        :value="currentGameMode"
        :options="getGameModeOptions()"
        @change="toggleGameMode"
      />
    </section>

    <section>
      <h2 class="section-title">快捷键设置</h2>
      <SettingItem
        v-for="item in shortcutKeyBindList"
        mode="kbd"
        :title="item.label"
        :value="getBindingKeys(item.type)"
        @open="handleEdit(item.type)"
      />
    </section>

    <section>
      <h2 class="section-title">声音设置</h2>
      <SettingItem
        mode="checkbox"
        title="开启键盘打字音效"
        :value="keyboardSound"
        @change="toggleKeyboardSound"
      />
      <SettingItem
        mode="checkbox"
        title="答案页面自动播放声音"
        :value="autoPlaySound"
        @change="toggleAutoPlaySound"
      />
      <SettingItem
        mode="checkbox"
        title="答题时自动播放声音"
        :value="autoPlayEnglish"
        @change="toggleAutoPlayEnglish"
      />
      <SettingItem
        mode="radio"
        title="切换口音"
        :value="pronunciation"
        :options="getPronunciationOptions()"
        @change="togglePronunciation"
      />
    </section>

    <section>
      <h2 class="section-title">答题设置</h2>
      <SettingItem
        mode="checkbox"
        title="显示每个单词长度"
        :value="showWordsWidth"
        @change="toggleAutoWordsWidth"
      />
      <SettingItem
        mode="checkbox"
        title="开启空格提交答案"
        :value="useSpace"
        @change="toggleUseSpaceSubmitAnswer"
      />
      <SettingItem
        mode="checkbox"
        title="答题正确后自动下一题"
        :value="autoNextQuestion"
        @change="toggleAutoQuestion"
      />
      <SettingItem
        mode="checkbox"
        title="自动显示答案（输错三次）"
        :value="showErrorTip"
        @change="toggleShowErrorTip"
      />
    </section>
  </div>
  <KeyBinding
    :showModal="showModal"
    :shortcutKeyStr="shortcutKeyStr"
    :shortcutKeyTip="shortcutKeyTip"
    :hasSameShortcutKey="hasSameShortcutKey"
    @close="handleCloseDialog"
  />
</template>

<style scoped>
section > *:last-child {
  @apply border-none;
}
.section-title {
  @apply border-b pb-3 text-xl font-medium;
}
</style>
