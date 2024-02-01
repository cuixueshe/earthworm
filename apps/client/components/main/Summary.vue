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
          <p class="text-3 text-right text-gray-200"> —— 金山词霸「每日一句」</p>
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
import { useCourseStore, type Course } from "~/store/course";
import { useSummary, useDailySentence } from "~/composables/main/summary";
import { useGameMode } from "~/composables/main/game";
import confetti from "canvas-confetti";
import { useAuthRequire } from "~/composables/main/authRequire";
import { useUserStore } from "~/store/user";

let nextCourseId = 1
const courseStore = useCourseStore();


const { handleDoAgain } = useDoAgain();
const { handleGoToNextCourse } = useGoToNextCourse();

const { showModal, hideSummary } = useSummary();
const { zhSentence, enSentence } = useDailySentence();


const { confettiCanvasRef, playConfetti } = useConfetti();

watch(showModal, (val) => {
  val && setTimeout(async () => {
    completeCourse();
    playConfetti()
  }, 300);

  if (!val) {
    courseStore.resetStatementIndex()
  }
})



async function completeCourse() {
  const userStore = useUserStore();

  if (userStore.user) {
    const nextCourse = await courseStore.completeCourse(
      courseStore.currentCourse.id
    );

    nextCourseId = nextCourse.id
  }
}

function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    courseStore.doAgain();
    hideSummary()
    showQuestion();
  }

  return {
    handleDoAgain,
  };
}

function useConfetti() {
  const confettiCanvasRef = ref<HTMLCanvasElement>();
  let myConfetti: ReturnType<typeof confetti.create>

  const initMyConfetti = () => {
    myConfetti = confetti.create(confettiCanvasRef.value, {
      resize: true,
      useWorker: true,
    });
  }

  const normalConfetti = () => {
    myConfetti({
      particleCount: 300,
      spread: 180,
      origin: { y: -0.1 },
      startVelocity: -35,
    });   
  }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const lastDayConfetti = () => {
    const end = Date.now() + (15 * 1000);
    
    const colors = ['#bb0000', '#ffffff'];

    (function frame() {
      myConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      myConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  const firstDayConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const chineseReds = ['#ed5a65', '#c04851', '#c02c38', '#7c1823']
    const interval:NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: chineseReds });
      myConfetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: chineseReds });
    }, 250);
  }

  const playConfetti = () => {
    if (isTheFirstDayOfLunarYear()) {
      firstDayConfetti()
      return
    }

    if (isTheLastDayOfLunarYear()) {
      lastDayConfetti()
      return
    }
    
    normalConfetti()
  };

  onMounted(() => {
    initMyConfetti()
  })

  return {
    confettiCanvasRef,
    playConfetti,
  };
}

function useGoToNextCourse() {
  const { showQuestion } = useGameMode();
  const router = useRouter();
  const { showAuthRequireModal } = useAuthRequire();

  const userStore = useUserStore();

  async function handleGoToNextCourse() {
    if (!userStore.user) {
      hideSummary()
      showAuthRequireModal();
      return;
    }

    router.push(`/main/${nextCourseId}`);
    hideSummary()
  }

  return {
    handleGoToNextCourse,
  };
}
</script>
