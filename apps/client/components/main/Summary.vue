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
            class="absolute top-0 right-0 w-8 h-8 p-0 mx-1 rounded-md btn btn-sm btn-ghost"
            @click="soundSentence"
          >
            <svg
              t="1708743313057"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1534"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M513.3 105.4L309.9 309H165.7c-37.5 0-67.9 30.4-67.9 67.9v271.4c0 37.5 30.4 67.9 67.9 67.9h144.2l203.5 203.6c37.5 0 67.8-30.4 67.8-67.9V173.3c0-37.5-30.4-67.9-67.9-67.9z m0 744.1l-178-196.4H165.7V381.7h169.6l178-196.5v664.3z m402.2-307.2c6.7 0 12.1-13.3 12.1-29.8 0-16.4-5.4-29.8-12.1-29.8h-84.8c-6.7 0-12.1 13.3-12.1 29.8 0 16.4 5.4 29.8 12.1 29.8h84.8z m9.2-384.6c5.8-3.3 3.8-17.6-4.4-31.8s-19.6-23.1-25.4-19.7l-73.5 42.4c-5.8 3.3-3.8 17.6 4.4 31.8s19.6 23.1 25.4 19.7l73.5-42.4z m0 709.7c5.8 3.4 3.8 17.6-4.4 31.8s-19.6 23.1-25.4 19.7l-73.5-42.4c-5.8-3.4-3.8-17.6 4.4-31.8s19.6-23.1 25.4-19.7l73.5 42.4zM628.9 665c-6.1-16.3-4.4-31.7 11.9-37.8 41.1-19 60.8-55.9 65.8-102.3 5.9-54.1-20-103.8-64.7-124.2-14.6-9.4-20.7-25.7-11.3-40.3 9.4-14.6 25.7-20.7 40.3-11.3 66.2 38.4 105.8 105.2 97.4 182.5-6.7 61.8-44.3 120.2-101.7 145.3-13.3 7.6-31.3 2.6-37.7-11.9z m0 0"
                p-id="1535"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div class="flex flex-col">
          <div class="flex">
            <span class="text-6xl font-bold">"</span>
            <div class="flex-1 text-xl leading-loose text-center">
              {{ enSentence }}
            </div>
            <span class="invisible text-6xl font-bold">"</span>
          </div>

          <div class="flex">
            <span class="invisible text-6xl font-bold">"</span>
            <div class="flex-1 text-xl leading-loose text-center">
              {{ zhSentence }}
            </div>
            <span class="text-6xl font-bold">"</span>
          </div>
          <p class="text-right text-gray-200 text-3">—— 金山词霸「每日一句」</p>
          <p class="text-gray-600 text-base leading-loose pl-14">
            {{
              `恭喜您一共完成 ${courseTimer.totalRecordNumber()} 道题，用时 ${formatSecondsToTime(
                courseTimer.calculateTotalTime()
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
        class="absolute top-0 left-0 w-full h-full pointer-events-none"
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
import { useCourseStore } from "~/store/course";
import { useUserStore } from "~/store/user";
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
  const userStore = useUserStore();

  if (userStore.user && courseStore.currentCourse) {
    const { nextCourse } = await courseStore.completeCourse(
      courseStore.currentCourse.id
    );

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
  const userStore = useUserStore();
  const { showAuthRequireModal } = useAuthRequire();

  async function handleGoToNextCourse() {
    // 无论后续如何处理，都需要先隐藏 Summary 页面
    hideSummary();
    if (!userStore.user) {
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
