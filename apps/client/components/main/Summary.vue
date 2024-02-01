<template>
  <div>
    <dialog className="modal mt-[-8vh]" :open="showModal">
      <div className="modal-box max-w-[48rem]">
        <h3 className="font-bold text-lg mb-4">🎉 Congratulations!</h3>
        <div class="flex flex-col">
          <div class="flex">
            <span class="text-6xl font-bold">"</span>
            <div class="flex-1 text-xl text-center leading-loose">
              {{ enSentence }}
            </div>
            <span class="text-6xl font-bold invisible">"</span>
          </div>

          <div class="flex">
            <span class="text-6xl font-bold invisible">"</span>
            <div class="flex-1 text-center text-xl leading-loose">
              {{ zhSentence }}
            </div>
            <span class="text-6xl font-bold">"</span>
          </div>
          <p class="text-3 text-right text-gray-200">—— 金山词霸「每日一句」</p>
        </div>
        <div className="modal-action">
          <button class="btn" @click="handleDoAgain">再来一次</button>
          <button class="btn" @click="handleGoToNextCourse">开始下一课</button>
        </div>
      </div>
      <canvas ref="confettiCanvasRef" class="absolute top-0 left-0 h-full w-full pointer-events-none"></canvas>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import confetti from "canvas-confetti";
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "~/store/user";
import { useCourseStore } from "~/store/course";
import { useActiveCourseId } from '~/store/course';
import { useGameMode } from "~/composables/main/game";
import { useAuthRequire } from "~/composables/main/authRequire";
import { useSummary, useDailySentence } from "~/composables/main/summary";

let nextCourseId = 1;
const courseStore = useCourseStore();
const { handleDoAgain } = useDoAgain();
const { handleGoToNextCourse } = useGoToNextCourse();
const { showModal, hideSummary } = useSummary();
const { zhSentence, enSentence } = useDailySentence();
const { confettiCanvasRef, playConfetti } = useConfetti();

watch(showModal, (val) => {
  if (val) {
    // 显示结算面板代表当前课程已经完成
    completeCourse();
    // 延迟一小会放彩蛋
    setTimeout(async () => {
      playConfetti();
    }, 300);
  } else {
    // 从显示状态关闭结算面板
    courseStore.resetStatementIndex();
  }
})

async function completeCourse() {
  const userStore = useUserStore();

  if (userStore.user && courseStore.currentCourse) {
    const nextCourse = await courseStore.completeCourse(courseStore.currentCourse.id);
    nextCourseId = nextCourse.id
    // 缓存下一课的课程 id
    const { updateCourseId } = useActiveCourseId();
    updateCourseId(nextCourseId)
  }
}

function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    courseStore.doAgain();
    courseStore.currentCourse?.id && courseStore.resetCurrentCourse(courseStore.currentCourse?.id)
    hideSummary();
    showQuestion();
  }

  return {
    handleDoAgain,
  };
}

function useConfetti() {
  const confettiCanvasRef = ref<HTMLCanvasElement>();

  const playConfetti = () => {
    const myConfetti = confetti.create(confettiCanvasRef.value, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 300,
      spread: 180,
      origin: { y: -0.1 },
      startVelocity: -35,
    });
  };

  return {
    confettiCanvasRef,
    playConfetti,
  };
}

function useGoToNextCourse() {
  const router = useRouter();
  const userStore = useUserStore();
  const { showAuthRequireModal } = useAuthRequire();

  async function handleGoToNextCourse() {
    // 无论后续如何处理，都需要先隐藏 Summary 页面
    hideSummary()
    courseStore.currentCourse?.id && courseStore.resetCurrentCourse(courseStore.currentCourse?.id)
    if (!userStore.user) {
      // 去注册
      showAuthRequireModal();
      return;
    }

    router.push(`/main/${nextCourseId}`);
  }

  return {
    handleGoToNextCourse,
  };
}
</script>
