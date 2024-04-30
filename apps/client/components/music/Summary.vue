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
            返回音乐列表
            <kbd class="kbd"> ↵ </kbd>
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
import { navigateTo } from "#app";
import { watch } from "vue";

import { courseTimer } from "~/composables/courses/courseTimer";
import { useConfetti } from "~/composables/main/confetti/useConfetti";
import { readOneSentencePerDayAloud } from "~/composables/main/englishSound";
import { useShareModal } from "~/composables/main/shareImage/share";
import { useDailySentence, useSummary } from "~/composables/main/summary";
import { useMusicStore } from "~/store/music";
import { formatSecondsToTime } from "~/utils/date";
import { cancelShortcut, registerShortcut } from "~/utils/keyboardShortcuts";

const musicStore = useMusicStore();
const { goToNextCourse } = useMusicCourse();
const { handleDoAgain } = useDoAgain();
const { showModal, hideSummary } = useSummary();
const { zhSentence, enSentence } = useDailySentence();
const { confettiCanvasRef, playConfetti } = useConfetti();
const { showShareModal } = useShareModal();

watch(showModal, (val) => {
  if (val) {
    registerShortcut("enter", goToNextCourse);
    soundSentence();
    setTimeout(async () => {
      playConfetti();
    }, 300);
  } else {
    cancelShortcut("enter", goToNextCourse);
    musicStore.resetLyricIndex();
  }
});

function useDoAgain() {
  function handleDoAgain() {
    musicStore.resetLyricIndex();
    hideSummary();
    courseTimer.reset();
  }

  return {
    handleDoAgain,
  };
}

function soundSentence() {
  readOneSentencePerDayAloud(enSentence.value);
}

function useMusicCourse() {
  async function goToNextCourse() {
    hideSummary();
    navigateTo(`/music/courses`);
  }

  return {
    goToNextCourse,
  };
}

const toShare = () => {
  showShareModal();
};
</script>
