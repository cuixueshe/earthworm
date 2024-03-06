<template>
  <div class="relative flex items-center py-3 border-t border-b border-solid border-slate-200 text-base">
    <div class="link-item">
      <NuxtLink href="/courses">
        <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
            <path stroke-dasharray="10" stroke-dashoffset="10" d="M17 9L20 12L17 15">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="10;0" />
            </path>
            <path stroke-dasharray="16" stroke-dashoffset="16" d="M5 5H19">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
            </path>
            <path stroke-dasharray="12" stroke-dashoffset="12" d="M5 12H14">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="12;0" />
            </path>
            <path stroke-dasharray="16" stroke-dashoffset="16" d="M5 19H19">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="16;0" />
            </path>
          </g>
        </svg>
      </NuxtLink>
    </div>
    <div class="ml-4 mr-1 text-gray-400">
      {{ coursesStore.currentCourse?.title }}
    </div>
    <div>
      （{{ currentSchedule }}<span class="mx-[2px]">/</span>{{ courseStore.totalQuestionsCount }}）
    </div>
    <StudyVideoLink :course-id="courseStore.currentCourse?.id" />
    <div class="flex-1"></div>
    <div @click="handleDoAgain" class="link-item mr-4">
      <svg class="icon-item" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
        <path fill="currentColor"
          d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z" />
      </svg>
    </div>
    <div @click="rankModal.show" class="link-item">排行榜</div>
    <div
      class="absolute left-0 bottom-[-12px] h-[12px] bg-green-500 rounded rounded-tl-none rounded-bl-none transition-all"
      :style="{ width: currentPercentage + '%' }"></div>
  </div>
  <ProgressRank></ProgressRank>
  <MessageBox class="mt-[-4vh]" v-model:isShowModal="showTipModal" content="Do you confirm the reset progress?"
    @confirm="handleTipConfirm"></MessageBox>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCourseStore } from "~/store/course";
import { useGameMode } from "~/composables/main/game";
import { useRankModal } from "~/composables/rank/modal";
import ProgressRank from "~/components/rank/ProgressRank.vue";
import MessageBox from "~/components/main/MessageBox.vue";
import StudyVideoLink from "./StudyVideoLink.vue";

const rankModal = useRankModal();
const courseStore = useCourseStore();

const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});

const currentPercentage = computed(() => {
  if (courseStore.isAllDone()) {
    return 100;
  }
  return (
    (courseStore.statementIndex / courseStore.totalQuestionsCount) *
    100
  ).toFixed(2);
});

const coursesStore = useCourseStore();
const { showTipModal, handleDoAgain, handleTipConfirm } =
  useDoAgain();

function useDoAgain() {
  const showTipModal = ref<boolean>(false);
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    showTipModal.value = true;
  }

  function handleTipConfirm() {
    coursesStore.doAgain();
    showQuestion();
    location.reload()
  }

  return {
    showTipModal,
    handleDoAgain,
    handleTipConfirm,
  };
}

</script>

<style scoped>
.icon-item {
  @apply w-6 h-6;
}

.link-item {
  @apply cursor-pointer hover:text-fuchsia-500;
}
</style>
