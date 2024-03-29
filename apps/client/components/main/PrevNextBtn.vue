<template>
  <div class="absolute justify-around left-0 right-0 top-2/3 flex flex-row">
    <div
      :class="[
        'w-[150px]',
        '-translate-y-2/3',
        '-translate-x-3/4',
        courseStore.statementIndex
          ? 'cursor-pointer'
          : 'dark:text-gray-600 cursor-not-allowed text-gray-300',
      ]"
      @click="goToPreviousQuestion"
    >
      <div class="ml-10 mb-2">
        <svg
          v-if="courseStore.statementIndex"
          t="1711738980240"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2834"
          id="mx_n_1711738980241"
          width="48"
          height="48"
        >
          <path
            d="M512 1024a512 512 0 1 1 512-512 512.576 512.576 0 0 1-512 512z m0-960a448 448 0 1 0 448 448A448.512 448.512 0 0 0 512 64z m256 480H333.248l137.376 137.376a32 32 0 1 1-45.248 45.248l-192-192a32 32 0 0 1 0-45.248l192-192a32 32 0 0 1 45.248 45.248L333.248 480H768a32 32 0 0 1 0 64z"
            fill="#774477"
            p-id="2835"
          ></path>
        </svg>
        <svg
          v-else
          t="1711740675806"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4379"
          id="mx_n_1711740675806"
          width="48"
          height="48"
        >
          <path
            d="M512 1024a512 512 0 1 1 512-512 512.576 512.576 0 0 1-512 512z m0-960a448 448 0 1 0 448 448A448.512 448.512 0 0 0 512 64z m256 480H333.248l137.376 137.376a32 32 0 1 1-45.248 45.248l-192-192a32 32 0 0 1 0-45.248l192-192a32 32 0 0 1 45.248 45.248L333.248 480H768a32 32 0 0 1 0 64z"
            fill="#cea7e6"
            p-id="4380"
          ></path>
        </svg>
      </div>
      <span class="mr-1"> ⌃ {{ shortcutKeys.previous }} </span>
      <span class="ml-2">上一题</span>
    </div>
    <div
      class="w-[150px] -translate-y-2/3 translate-x-full cursor-pointer"
      @click="goToNextQuestion"
    >
      <div class="ml-10 mb-2">
        <svg
          t="1711739973637"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3451"
          width="48"
          height="48"
        >
          <path
            d="M512 1024a512 512 0 1 1 512-512 512.576 512.576 0 0 1-512 512z m0-960a448 448 0 1 0 448 448A448.512 448.512 0 0 0 512 64z m86.624 662.624a32 32 0 0 1-45.248-45.248L690.752 544H256a32 32 0 0 1 0-64h434.752l-137.376-137.376a32 32 0 0 1 45.248-45.248l192 192a32 32 0 0 1 0 45.248z"
            fill="#774477"
            p-id="3452"
          ></path>
        </svg>
      </div>
      <span class="mr-1"> ⌃ {{ shortcutKeys.skip }} </span>
      <span class="ml-2">下一题</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useGameMode } from "~/composables/main/game";
import { useSummary } from "~/composables/main/summary";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { useCourseStore } from "~/store/course";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const { shortcutKeys } = useShortcutKeyMode();
const courseStore = useCourseStore();
const { showQuestion } = useGameMode();
const { showSummary } = useSummary();
const { goToNextQuestion, goToPreviousQuestion } = usePrevAndNextQuestion(
  shortcutKeys.value.previous,
  shortcutKeys.value.skip
);
// 上一题/下一题
function usePrevAndNextQuestion(prevKey: string, nextKey: string) {
  handleShortcut();

  function goToNextQuestion() {
    if (courseStore.isAllDone()) {
      showSummary();
      return;
    }
    courseStore.toNextStatement();
    showQuestion();
  }

  function goToPreviousQuestion() {
    courseStore.toPreviousStatement();
    showQuestion();
  }

  function handleShortcut() {
    onMounted(() => {
      registerShortcut(nextKey, goToNextQuestion);
      registerShortcut(prevKey, goToPreviousQuestion);
    });

    onUnmounted(() => {
      cancelShortcut(prevKey, goToNextQuestion);
      cancelShortcut(nextKey, goToPreviousQuestion);
    });
  }

  return {
    goToNextQuestion,
    goToPreviousQuestion,
  };
}
</script>

<style scoped></style>
