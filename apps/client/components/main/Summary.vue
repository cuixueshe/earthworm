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
    await completeCourse();
    playConfetti()
  }, 300);
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
    showQuestion();
    hideSummary()
  }

  return {
    handleGoToNextCourse,
  };
}
</script>
