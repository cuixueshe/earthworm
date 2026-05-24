<template>
  <div
    class="mx-auto my-8 w-full max-w-screen-lg space-y-8 rounded-lg bg-base-100 px-6 py-8 shadow-even-lg dark:bg-gray-900 dark:shadow-gray-700 md:px-12"
  >
    <section>
      <h2 class="text-xl font-medium">Chế độ chơi</h2>
      <table class="table text-base">
        <tbody>
          <tr class="hover">
            <td class="label-text">Chế độ</td>
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
      <h2 class="text-xl font-medium">Cài đặt phím tắt</h2>
      <table class="table text-base">
        <thead>
          <tr class="text-base">
            <th class="">Chức năng</th>
            <th class="w-1/6 text-center">Phím tắt</th>
            <th class="w-2/6 pr-6 text-right">Thao tác</th>
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
                  Sửa
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="text-xl font-medium">Cài đặt âm thanh</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">Bật âm thanh gõ phím</td>
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
            <td class="label-text">Tự động phát âm thanh ở trang đáp án</td>
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
            <td class="label-text">Tự động phát âm thanh khi làm bài</td>
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
            <td class="label-text">Chọn giọng phát âm</td>
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
      <h2 class="text-xl font-medium">Cài đặt làm bài</h2>
      <table class="table">
        <tbody>
          <tr class="hover">
            <td class="label-text">Hiển thị độ dài mỗi từ</td>
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
            <td class="label-text">Dùng phím cách để gửi đáp án</td>
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
            <td class="label-text">Tự động sang câu tiếp theo khi trả lời đúng</td>
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
            <td class="label-text">Tự động hiển thị đáp án (sai 3 lần)</td>
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
    label: "Phát âm",
    type: SHORTCUT_KEY_TYPES.SOUND,
  },
  {
    label: "Hiển thị/ẩn xem đáp án/làm lại",
    type: SHORTCUT_KEY_TYPES.ANSWER,
  },
  {
    label: "Quay lại câu trước",
    type: SHORTCUT_KEY_TYPES.PREVIOUS,
  },
  {
    label: "Bỏ qua câu hiện tại",
    type: SHORTCUT_KEY_TYPES.SKIP,
  },
  {
    label: "Đánh dấu đã thuộc",
    type: SHORTCUT_KEY_TYPES.MASTERED,
  },
  {
    label: "Tạm dừng/Tiếp tục trò chơi",
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
