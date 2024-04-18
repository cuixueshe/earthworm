<template>
  <div>
    <dialog
      className="modal mt-[-8vh]"
      :open="showModal"
    >
      <div className="modal-box max-w-[48rem]">
        <div class="relative">
          <h3 className="font-bold text-lg mb-4">🎉 Congratulations!</h3>
          <button
            tabindex="0"
            class="btn btn-ghost btn-sm absolute right-0 top-0 mx-1 h-7 w-7 rounded-md p-0"
            @click="soundSentence"
          >
            <i class="i-ph-speaker-simple-high h-full w-full"></i>
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
            @click="handleGoToNextCourse"
          >
            开始下一课<kbd class="kbd"> ↵ </kbd>
          </button>
        </div>
      </div>
      <canvas
        ref="confettiCanvasRef"
        class="pointer-events-none absolute left-0 top-0 h-full w-full"
      ></canvas>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";

import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { courseTimer } from "~/composables/courses/courseTimer";
import { useAuthRequire } from "~/composables/main/authRequire";
import { useConfetti } from "~/composables/main/confetti/useConfetti";
import { readOneSentencePerDayAloud } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useShareModal } from "~/composables/main/shareImage/share";
import { useDailySentence, useSummary } from "~/composables/main/summary";
import { isAuthenticated } from "~/services/auth";
import { useCourseStore } from "~/store/course";
import { formatSecondsToTime } from "~/utils/date";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

let nextCourseId = 1;
const courseStore = useCourseStore();
const { handleDoAgain } = useDoAgain();
const { handleGoToNextCourse } = useGoToNextCourse();
const { showModal, hideSummary } = useSummary();
const { zhSentence, enSentence } = useDailySentence();
const { confettiCanvasRef, playConfetti } = useConfetti();
const { showShareModal } = useShareModal();
const { updateActiveCourseId } = useActiveCourseId();

watch(showModal, (val) => {
  if (val) {
    // 注册回车键进入下一课
    registerShortcut("enter", handleGoToNextCourse);
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
    cancelShortcut("enter", handleGoToNextCourse);
    // 从显示状态关闭结算面板
    courseStore.resetStatementIndex();
  }
});

async function completeCourse() {
  const { updateActiveCourseId } = useActiveCourseId();

  if (isAuthenticated() && courseStore.currentCourse) {
    const { nextCourse } = await courseStore.completeCourse(courseStore.currentCourse.id);

    if (nextCourse) {
      nextCourseId = nextCourse.id;
      updateActiveCourseId(nextCourseId);
    }
  }
}

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

function useGoToNextCourse() {
  const router = useRouter();
  const { showAuthRequireModal } = useAuthRequire();

  async function handleGoToNextCourse() {
    // 无论后续如何处理，都需要先隐藏 Summary 页面
    hideSummary();
    if (!isAuthenticated()) {
      // 去注册
      showAuthRequireModal();
      return;
    }

    updateActiveCourseId(nextCourseId);
    router.push(`/main/${nextCourseId}`);
  }

  return {
    handleGoToNextCourse,
  };
}

const toShare = () => {
  showShareModal();
};
</script>
