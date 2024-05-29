<template>
  <CommonModal
    :show-modal="showModal"
    tw-class="max-w-[48rem]"
  >
    <div class="relative">
      <h3 className="font-bold text-lg mb-4">🎉 Congratulations!</h3>
      <button
        tabindex="0"
        class="btn btn-ghost btn-sm absolute right-0 top-0 mx-1 h-7 w-7 rounded-md p-0"
        @click="soundSentence"
      >
        <span class="i-ph-speaker-simple-high h-full w-full"></span>
      </button>
    </div>

    <div class="flex flex-col">
      <div class="flex">
        <span class="text-6xl font-bold">"</span>
        <div class="flex-1 text-center text-xl leading-loose">
          {{ enSentence }}
        </div>
        <span class="invisible text-6xl font-bold">"</span>
      </div>

      <div class="flex">
        <span class="invisible text-6xl font-bold">"</span>
        <div class="flex-1 text-center text-xl leading-loose">
          {{ zhSentence }}
        </div>
        <span class="text-6xl font-bold">"</span>
      </div>
      <p class="text-3 text-right text-gray-200">—— 金山词霸「每日一句」</p>
      <p class="pl-14 text-base leading-loose text-gray-600">
        {{
          `恭喜您一共完成 ${courseTimer.totalRecordNumber()} 道题，用时 ${formatSecondsToTime(
            courseTimer.calculateTotalTime(),
          )} `
        }}
      </p>
    </div>
    <div className="modal-action">
      <button
        class="btn btn-primary"
        @click="toShare"
      >
        生成打卡图
      </button>
      <button
        class="btn"
        @click="handleDoAgain"
      >
        再来一次
      </button>

      <button
        class="btn"
        @click="goToNextCourse"
      >
        {{ haveNextCourse || !isAuthenticated() ? "开始下一课" : "返回课程列表" }}
        <kbd class="kbd"> ↵ </kbd>
      </button>
    </div>
  </CommonModal>

  <canvas
    ref="confettiCanvasRef"
    class="pointer-events-none absolute left-0 top-0 z-[1000] h-full w-full"
  ></canvas>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { computed, ref, watch } from "vue";

import { useActiveCourseMap } from "~/composables/courses/activeCourse";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useLearnRecord } from "~/composables/learnRecord";
import { useAuthRequire } from "~/composables/main/authRequire";
import { useConfetti } from "~/composables/main/confetti/useConfetti";
import { readOneSentencePerDayAloud } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useShareModal } from "~/composables/main/shareImage/share";
import { useDailySentence, useSummary } from "~/composables/main/summary";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";
import { useCoursePackStore } from "~/store/coursePack";
import { permitSaveStatement, preventSaveStatement } from "~/store/statement";
import { formatSecondsToTime } from "~/utils/date";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const courseStore = useCourseStore();
const coursePackStore = useCoursePackStore();
const { goToNextCourse, completeCourse, haveNextCourse } = useCourse();
const { handleDoAgain } = useDoAgain();
const { showModal, hideSummary } = useSummary();
const { zhSentence, enSentence } = useDailySentence();
const { confettiCanvasRef, playConfetti } = useConfetti();
const { showShareModal } = useShareModal();
const { updateActiveCourseMap } = useActiveCourseMap();
const { updateLearnRecord } = useLearnRecord();

watch(showModal, (val) => {
  if (val) {
    // 阻止包含 statement 完成课程后会自动把用户的进度设置成下一课
    // 这里是为了防止先设置成下一课 后更新了 statement 的进度
    // 这就会造成获取用户最近的课程包进度出现错误  因为是基于时间来获取的
    preventSaveStatement();
    // 注册回车键进入下一课
    registerShortcut("enter", goToNextCourse);
    // 显示结算面板代表当前课程已经完成
    completeCourse();
    // 朗读每日一句
    soundSentence();
    // 延迟一小会放彩蛋
    setTimeout(async () => {
      playConfetti();
    }, 300);
  } else {
    // 取消回车键进入下一课
    cancelShortcut("enter", goToNextCourse);
    // 从显示状态关闭结算面板
    courseStore.resetStatementIndex();
    permitSaveStatement();
  }
});

function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    courseStore.doAgain();
    hideSummary();
    showQuestion();
    courseTimer.reset();
  }

  return {
    handleDoAgain,
  };
}

// 朗读每日一句
function soundSentence() {
  readOneSentencePerDayAloud(enSentence.value);
}

function useCourse() {
  let nextCourseId = ref("");

  const haveNextCourse = computed(() => {
    return nextCourseId.value;
  });

  async function goToNextCourse() {
    const { showAuthRequireModal } = useAuthRequire();

    // 无论后续如何处理，都需要先隐藏 Summary 页面
    hideSummary();
    if (!isAuthenticated()) {
      // 去注册
      showAuthRequireModal();
      return;
    }

    if (nextCourseId.value) {
      navigateTo(`/game/${courseStore.currentCourse?.coursePackId}/${nextCourseId.value}`);
    } else {
      navigateTo(`/course-pack/${courseStore.currentCourse?.coursePackId}`);
    }
  }

  async function completeCourse() {
    if (isAuthenticated() && courseStore.currentCourse) {
      const { coursePackId } = courseStore.currentCourse;
      const { nextCourse } = await courseStore.completeCourse();
      coursePackStore.updateCoursesCompleteCount(coursePackId);
      updateLearnRecord();

      if (nextCourse) {
        nextCourseId.value = nextCourse.id;
        updateActiveCourseMap(coursePackId, nextCourseId.value);
      } else {
        updateActiveCourseMap(coursePackId, "");
      }
    }
  }

  return {
    completeCourse,
    goToNextCourse,
    haveNextCourse,
  };
}

const toShare = () => {
  showShareModal();
};
</script>
