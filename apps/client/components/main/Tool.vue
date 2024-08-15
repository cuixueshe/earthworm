<template>
  <div
    class="relative flex items-center justify-between border-t border-solid border-gray-300 pb-3 pt-4 text-base dark:border-gray-600"
  >
    <!-- 左侧 -->
    <div class="flex items-center">
      <NuxtLink
        class="clickable-item flex items-center justify-center"
        :href="`/course-pack/${courseStore.currentCourse?.coursePackId}`"
      >
        <UTooltip text="课程列表">
          <IconsExpand class="h-7 w-7" />
        </UTooltip>
      </NuxtLink>
      <div
        class="clickable-item ml-4"
        @click="openCourseContents"
      >
        <UTooltip text="课程题目列表">
          {{ currentCourseInfo }}
        </UTooltip>
      </div>
      <MainStudyVideoLink :video="courseStore.currentCourse?.video" />
    </div>

    <!-- 右侧 -->
    <div class="flex items-center gap-4">
      <div
        @click="openGameSettingModal"
        v-if="isDictationMode()"
      >
        <UTooltip text="游戏设置">
          <UIcon
            name="i-ph-gear"
            class="clickable-item h-6 w-6"
          />
        </UTooltip>
      </div>

      <div
        v-if="isAuthenticated()"
        @click="pauseGame"
      >
        <UTooltip
          text="暂停游戏"
          :shortcuts="parseShortcut(shortcutKeys.pause)"
        >
          <UIcon
            name="i-ph-pause"
            class="clickable-item h-6 w-6"
          />
        </UTooltip>
      </div>

      <div @click="handleDoAgain">
        <UTooltip text="重置当前课程进度">
          <UIcon
            name="i-ph-arrow-counter-clockwise"
            class="clickable-item h-6 w-6"
          />
        </UTooltip>
      </div>
      <div @click="rankingStore.showRankModal">
        <UTooltip text="排行榜">
          <UIcon
            name="i-ph-ranking"
            class="clickable-item h-6 w-6"
          />
        </UTooltip>
      </div>
    </div>

    <MainCourseContents v-model:isOpen="isOpenCourseContents"></MainCourseContents>
  </div>

  <CommonProgressBar
    class="h-6 p-[2px]"
    :percentage="currentPercentage"
  />
  <RankRankingBoard />
</template>

<script setup lang="ts">
import { useModal } from "#imports";
import { computed, ref } from "vue";

import Dialog from "~/components/common/Dialog.vue";
import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useGameMode } from "~/composables/main/game";
import { clearQuestionInput } from "~/composables/main/question";
import { useCourseContents } from "~/composables/main/useCourseContents";
import { useGamePause } from "~/composables/main/useGamePause";
import { useGameSetting } from "~/composables/main/useGameSetting";
import { useRanking } from "~/composables/rank/rankingList";
import { useGamePlayMode } from "~/composables/user/gamePlayMode";
import { parseShortcut, useShortcutKeyMode } from "~/composables/user/shortcutKey";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";

const { shortcutKeys } = useShortcutKeyMode();
const { isDictationMode } = useGamePlayMode();
const rankingStore = useRanking();
const courseStore = useCourseStore();
const { focusInput } = useQuestionInput();
const { openCourseContents } = useCourseContents();
const { handleDoAgain } = useDoAgain();
const { pauseGame } = useGamePause();
const { openGameSettingModal } = useGameSetting();
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

const isOpenCourseContents = ref(false);

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
</style>
