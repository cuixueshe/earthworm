<template>
  <div
    class="relative flex items-center justify-between border-t border-solid border-gray-300 pb-3 pt-4 text-base dark:border-gray-600"
  >
    <!-- 左侧 -->
    <div class="flex items-center">
      <NuxtLink
        class="clickable-item"
        data-tippy-content="课程列表"
        :href="`/course-pack/${courseStore.currentCourse?.coursePackId}`"
        @mouseenter="$lazyTippy"
      >
        <IconsExpand class="h-7 w-7" />
      </NuxtLink>
      <div
        class="clickable-item ml-4"
        data-tippy-content="课程题目列表"
        @click="toggleContents"
        @mouseenter="$lazyTippy"
      >
        {{ currentCourseInfo }}
      </div>
      <MainStudyVideoLink
        class="icon-item ml-1"
        :video="courseStore.currentCourse?.video"
      />
    </div>

    <!-- 右侧 -->
    <div class="flex items-center gap-4">
      <div
        data-tippy-content="暂停游戏"
        @click="handleGamePause"
        @mouseenter="$lazyTippy"
      >
        <span class="clickable-item icon-item i-ph-pause-bold"></span>
      </div>
      <div
        data-tippy-content="重置当前课程进度"
        @click="handleDoAgain"
        @mouseenter="$lazyTippy"
      >
        <span class="clickable-item icon-item i-ph-arrow-counter-clockwise"></span>
      </div>
      <div
        data-tippy-content="排行榜"
        @click="rankingStore.showRankModal"
        @mouseenter="$lazyTippy"
      >
        <span class="clickable-item icon-item i-ph-ranking"></span>
      </div>
    </div>

    <MainContents />
  </div>

  <CommonProgressBar
    class="h-6 p-[2px]"
    :percentage="currentPercentage"
  />
  <RankRankingList />
  <MainMessageBox
    v-model:show-modal="showTipModal"
    content="是否确认重置当前课程进度？"
    confirm-btn-text="确认"
    @confirm="handleTipConfirm"
  />

  <MainMessageBox
    v-model:show-modal="showGamePauseModal"
    content="游戏暂停 快点回来！"
    cancelBtnText=""
    confirm-btn-text="继续游戏"
    @confirm="handleGameResume"
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
import { useGameStore } from "~/store/game";
import { useContent } from "./Contents/useContents";

const rankingStore = useRanking();
const courseStore = useCourseStore();
const gameStore = useGameStore();
const { focusInput } = useQuestionInput();
const { toggleContents } = useContent();
const { showTipModal, handleDoAgain, handleTipConfirm } = useDoAgain();
const { showGamePauseModal, handleGameResume, handleGamePause } = useGamePause();

const currentCourseInfo = computed(() => {
  return `${courseStore.currentCourse?.title}（${currentSchedule.value}/${courseStore.totalQuestionsCount}）`;
});

const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});

const currentPercentage = computed(() => {
  if (courseStore.isAllDone()) {
    return 100;
  }
  return ((courseStore.statementIndex / courseStore.totalQuestionsCount) * 100).toFixed(2);
});

function useGamePause() {
  const showGamePauseModal = ref(false);

  function handleGameResume() {
    showGamePauseModal.value = false;
    gameStore.resumeGame();
  }

  function handleGamePause() {
    showGamePauseModal.value = true;
    gameStore.pauseGame();
  }

  return {
    showGamePauseModal,
    handleGameResume,
    handleGamePause,
  };
}

function useDoAgain() {
  const showTipModal = ref(false);
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
.clickable-item {
  @apply cursor-pointer select-none hover:text-fuchsia-500;
}

.icon-item {
  @apply h-6 w-6;
}
</style>
