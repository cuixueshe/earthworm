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
        v-if="isAuthenticated()"
        :data-tippy-content="`暂停游戏 (${shortcutKeys.pause})`"
        @click="pauseGame"
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
</template>

<script setup lang="ts">
import { useModal } from "#imports";
import { computed } from "vue";

import Dialog from "~/components/common/Dialog.vue";
import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useGameMode } from "~/composables/main/game";
import { clearQuestionInput } from "~/composables/main/question";
import { useGamePause } from "~/composables/main/useGamePause";
import { useRanking } from "~/composables/rank/rankingList";
import { useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";
import { useContent } from "./Contents/useContents";

const { shortcutKeys } = useShortcutKeyMode();
const rankingStore = useRanking();
const courseStore = useCourseStore();
const { focusInput } = useQuestionInput();
const { toggleContents } = useContent();
const { handleDoAgain } = useDoAgain();
const { pauseGame } = useGamePause();
const modal = useModal();

const currentCourseInfo = computed(() => {
  return `${courseStore.currentCourse?.title}（${currentSchedule.value}/${courseStore.visibleStatementsCount}）`;
});

const currentSchedule = computed(() => {
  return courseStore.visibleStatementIndex + 1;
});

const currentPercentage = computed(() => {
  if (courseStore.isAllDone()) {
    return 100;
  }
  return ((courseStore.visibleStatementIndex / courseStore.visibleStatementsCount) * 100).toFixed(
    2,
  );
});

function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    modal.open(Dialog, {
      title: "重置进度",
      content: "是否确认重置当前课程进度？",
      showCancel: true,
      showConfirm: true,
      async onCancel() {
        setTimeout(() => {
          focusInput();
        }, 300);
      },
      async onConfirm() {
        handleTipConfirm();
      },
    });
  }

  function handleTipConfirm() {
    courseStore.doAgain();
    clearQuestionInput();
    showQuestion();
    courseTimer.reset();
    // dialog 关闭后 自动聚焦 因为关闭有个 200 毫秒的动画 所以需要延迟聚焦 input
    setTimeout(() => {
      focusInput();
    }, 300);
  }

  return {
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
