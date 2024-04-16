<template>
  <div
    class="relative flex items-center border-b border-t border-solid border-slate-200 py-3 text-base"
  >
    <div
      class="link-item tooltip z-50"
      data-tip="课程列表"
    >
      <NuxtLink href="/courses">
        <svg
          class="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="2"
          >
            <path
              stroke-dasharray="10"
              stroke-dashoffset="10"
              d="M17 9L20 12L17 15"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.6s"
                dur="0.2s"
                values="10;0"
              />
            </path>
            <path
              stroke-dasharray="16"
              stroke-dashoffset="16"
              d="M5 5H19"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                dur="0.2s"
                values="16;0"
              />
            </path>
            <path
              stroke-dasharray="12"
              stroke-dashoffset="12"
              d="M5 12H14"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.2s"
                dur="0.2s"
                values="12;0"
              />
            </path>
            <path
              stroke-dasharray="16"
              stroke-dashoffset="16"
              d="M5 19H19"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.4s"
                dur="0.2s"
                values="16;0"
              />
            </path>
          </g>
        </svg>
      </NuxtLink>
    </div>
    <div class="z-50 ml-4 mr-1">
      {{ courseStore.currentCourse?.title }}
    </div>
    <div
      class="link-item tooltip z-50"
      data-tip="题目列表"
      @click="toggleContents"
    >
      （{{ currentSchedule }}<span class="mx-[2px]">/</span>{{ courseStore.totalQuestionsCount }}）
    </div>

    <MainStudyVideoLink
      class="mr-auto"
      :course-id="courseStore.currentCourse?.id"
    />

    <div
      @click="handleDoAgain"
      class="link-item mr-4 flex items-center"
    >
      <i class="icon-item i-ph-arrow-counter-clockwise"></i>
    </div>
    <div
      @click="rankingStore.showRankModal"
      class="link-item mr-3"
    >
      排行榜
    </div>
    <div
      class="absolute bottom-[-24px] left-0 right-0 h-[18px] rounded-lg border p-[2px] dark:border-slate-400"
    >
      <div
        class="h-full rounded-lg bg-gradient-to-r from-emerald-200 to-emerald-400 transition-all dark:from-emerald-300 dark:to-emerald-500"
        :style="{ width: `${currentPercentage}%` }"
      ></div>
    </div>
    <MainContents />
  </div>
  <RankRankingList />
  <MainMessageBox
    class="mt-[-4vh]"
    v-model:isShowModal="showTipModal"
    content="是否确认重置当前课程进度？"
    @confirm="handleTipConfirm"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useGameMode } from "~/composables/main/game";
import { clearQuestionInput } from "~/composables/main/question";
import { useRanking } from "~/composables/rank/rankingList";
import { useCourseStore } from "~/store/course";
import { useContent } from "./Contents/useContents";

const rankingStore = useRanking();
const courseStore = useCourseStore();
const { focusInput } = useQuestionInput();
const { toggleContents } = useContent();
const { showTipModal, handleDoAgain, handleTipConfirm } = useDoAgain();

const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});

const currentPercentage = computed(() => {
  if (courseStore.isAllDone()) {
    return 100;
  }
  return ((courseStore.statementIndex / courseStore.totalQuestionsCount) * 100).toFixed(2);
});

function useDoAgain() {
  const showTipModal = ref<boolean>(false);
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    showTipModal.value = true;
  }

  function handleTipConfirm() {
    courseStore.doAgain();
    clearQuestionInput();
    focusInput();
    showQuestion();
    courseTimer.reset();
  }

  return {
    showTipModal,
    handleDoAgain,
    handleTipConfirm,
  };
}
</script>

<style scoped>
.icon-item {
  @apply h-6 w-6;
}

.link-item {
  @apply cursor-pointer select-none hover:text-fuchsia-500;
}
</style>
