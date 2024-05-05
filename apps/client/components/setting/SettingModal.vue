<script lang="ts" setup>
import { useAutoNextQuestion } from "~/composables/user/autoNext";
import { useErrorTip } from "~/composables/user/errorTip";
import { usePronunciation } from "~/composables/user/pronunciation";
import {
  useAutoPlayEnglish,
  useAutoPronunciation,
  useKeyboardSound,
} from "~/composables/user/sound";
import { useSpaceSubmitAnswer } from "~/composables/user/submitKey";
import { useShowWordsWidth } from "~/composables/user/words";

const { pronunciation, getPronunciationOptions, togglePronunciation } = usePronunciation();
const { autoNextQuestion, toggleAutoQuestion } = useAutoNextQuestion();
const { autoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();
const { keyboardSound, toggleKeyboardSound } = useKeyboardSound();
const { autoPlayEnglish, toggleAutoPlayEnglish } = useAutoPlayEnglish();
const { showWordsWidth, toggleAutoWordsWidth } = useShowWordsWidth();
const { useSpace, toggleUseSpaceSubmitAnswer } = useSpaceSubmitAnswer();
const { showErrorTip, toggleShowErrorTip } = useErrorTip();

defineProps<{
  showModal: boolean;
}>();

defineEmits(["close"]);
</script>

<template>
  <CommonModal
    :show-modal="showModal"
    :close-on-click-modal="true"
    @close="$emit('close')"
  >
    <div
      class="modal-box relative max-w-[48rem] rounded-xl bg-gray-200/30 p-8 shadow-even-xl shadow-purple-500/30"
    >
      <div
        class="pointer-events-none absolute inset-0 z-[-1] backdrop-blur-md"
        style="mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))"
      />

      <div class="flex items-center justify-between">
        <h1 class="ml-4 text-2xl font-bold">常规</h1>

        <form method="dialog">
          <button
            class="btn btn-circle btn-ghost btn-sm cursor-pointer hover:bg-gray-50"
            @click="$emit('close')"
          >
            ✕
          </button>
        </form>
      </div>

      <h2 class="section-title mt-8">声音设置</h2>
      <section>
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

      <h2 class="section-title mt-8">答题设置</h2>
      <section>
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
  </CommonModal>
</template>

<style scoped>
.section-title {
  @apply ml-4 text-lg font-medium;
}

section {
  @apply mt-3 overflow-hidden rounded-2xl bg-opacity-100 px-4 opacity-100 shadow-even-md;

  & > * {
    @apply border-b border-b-slate-200;
  }

  & > *:last-child {
    @apply border-none;
  }
}
</style>
