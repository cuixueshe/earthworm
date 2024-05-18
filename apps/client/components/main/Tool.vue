<template>
  <div
    class="relative flex items-center justify-between border-t border-solid border-slate-200 py-3 text-base dark:border-slate-500"
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
        :course-order="courseStore.currentCourse?.order"
      />
    </div>

    <!-- 右侧 -->
    <div class="flex items-center">
      <div
        class="mr-4"
        data-tippy-content="重置当前课程进度"
        @click="handleDoAgain"
        @mouseenter="$lazyTippy"
      >
        <span class="clickable-item icon-item i-ph-arrow-counter-clockwise"></span>
      </div>
      <div
        class="tooltip mr-1"
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
import { useCoursePackStore } from "~/store/coursePack";
import { useContent } from "./Contents/useContents";

const rankingStore = useRanking();
const courseStore = useCourseStore();
const coursePackStore = useCoursePackStore();
const { focusInput } = useQuestionInput();
const { toggleContents } = useContent();
const { showTipModal, handleDoAgain, handleTipConfirm } = useDoAgain();

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
.clickable-item {
  @apply cursor-pointer select-none hover:text-fuchsia-500;
}

.icon-item {
  @apply h-6 w-6;
}
</style>
