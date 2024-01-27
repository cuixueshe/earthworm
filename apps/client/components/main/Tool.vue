<template>
  <div class="relative flex p-3 border-t border-b border-solid border-slate-200">
    <div class="link-item">
      <NuxtLink href="/courses">课程列表</NuxtLink>
    </div>
    <div class="mx-2 my-[3px] border-l border-slate-400"></div>
    <div>{{ coursesStore.currentCourse?.title }}</div>
    <div class="ml-1">({{ currentSchedule }}<span class="mx-[2px]">/</span>{{ courseStore.totalQuestionsCount }})</div>
    <div class="flex-1"></div>
    <div @click="handleDoAgain" class="link-item mr-4">重新开始</div>
    <!-- <div @click="tmpClick" class="link-item mr-4">打开结算面板</div> -->
    <!-- <div class="link-item mr-4">下一课</div> -->
    <div @click="openRank" class="link-item">排行榜</div>
    <div
      class="absolute left-0 bottom-[-12px] h-[12px] bg-green-500 rounded rounded-tl-none rounded-bl-none transition-all"
      :style="{ width: currentPercentage + '%' }"></div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { useGameMode } from "~/composables/main/game";

const courseStore = useCourseStore();

const currentSchedule = computed(() => {
  return courseStore.statementIndex + 1;
});

const currentPercentage = computed(() => {
  return Math.round(currentSchedule.value / courseStore.totalQuestionsCount * 100)
})

const coursesStore = useCourseStore();
const { handleDoAgain } = useDoAgain()

function tmpClick() {
  const { showSummary } = useGameMode();
  showSummary()
}

function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    coursesStore.doAgain();
    showQuestion()
  }

  return {
    handleDoAgain
  }

}

function openRank() {
  document.getElementById("rank-progress").showModal();
}
</script>

<style scoped>
.link-item {
  @apply cursor-pointer hover:text-fuchsia-500;
}
</style>
