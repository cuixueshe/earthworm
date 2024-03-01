<template>
  <div
    class="course-card"
    :class="{
      'current-card': currentCourse,
      'state-underway': courseState === 'underway',
      'state-finished': courseState === 'finished',
    }"
  >
    <h3 class="text-xl font-bold dark:text-gray-100">{{ title }}</h3>
    <p class="mt-4 truncate">this is the course's description</p>

    <span class="absolute top-5 right-5">{{ courseProgress }}</span>
    <div
      v-if="isCourseFinished"
      class="tooltip count"
      :class="{
        'state-underway-count': courseState === 'underway',
        'state-finished-count': courseState === 'finished',
        'current-count': currentCourse,
      }"
      data-tip="Congratulations! you've completed the course 10 times."
    >
      x10
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGameStore } from "~/store/game";
import { COURSE_PROGRESS } from "~/store/course";

const props = defineProps<{
  title: string;
  id: number;
}>();

const gameStore = useGameStore();
const currentCourse = computed(() => gameStore.activeCourseId == props.id);

function load() {
  const courseProgress = localStorage.getItem(COURSE_PROGRESS);
  if (!courseProgress) return;
  return JSON.parse(courseProgress);
}

const courseProgress = computed(() => {
  const value = load()[props.id];
  if (value) {
    let ratio = value.index / value.total;
    // 如果是0，认定该节课已完成
    if (ratio == 0) {
      ratio = 1;
    }
    return `${parseFloat((ratio * 100).toFixed(2))}%`;
  }
});

const courseState = computed(() => {
  let state = "unplayed";
  const value = load()[props.id];
  if (value) {
    let ratio = value.index / value.total;
    // 如果是0，认定该节课已完成
    if (ratio == 0) {
      state = "finished";
    } else {
      state = "underway";
    }
  }
  return state;
});

const isCourseFinished = computed(() => !!load()[props.id]);
</script>

<style scoped>
.course-card {
  @apply flex flex-col w-[360px] h-[160px] sm:w-[500px] md:w-[340px] lg:w-[280px] xl:w-[260px] p-4 pb-6 border border-slate-400 hover:shadow-lg hover:shadow-slate-400/50 hover:border-slate-400 rounded-xl transition-all duration-500 relative;
}
.current-card {
  @apply bg-[rgba(242,100,25,1)] text-white hover:shadow-[rgba(242,100,25,0.5)] hover:border-[rgba(242,100,25,1)];
}
.count {
  @apply absolute bottom-2.5 right-5 w-10 h-6 leading-6 text-center text-white bg-slate-400 rounded-md;
}
.state-underway {
  @apply border-[rgba(242,100,25,1)] hover:shadow-[rgba(242,100,25,0.5)] hover:border-[rgba(242,100,25,1)];
}
.state-underway-count {
  @apply bg-[rgba(242,100,25,1)];
}
.state-finished {
  @apply border-[rgba(154,78,255,1)] hover:shadow-[rgba(154,78,255,0.5)] hover:border-[rgba(154,78,255,1)];
}
.state-finished-count {
  @apply bg-[rgba(154,78,255,1)];
}
.current-count {
  @apply bg-white text-[rgba(242,100,25,1)];
}
</style>
