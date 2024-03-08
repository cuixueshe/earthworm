<template>
  <div
    class="course-card"
    :class="{
      'state-underway': courseState === 'underway',
      'state-finished': courseState === 'finished',
      'current-card': currentCourse,
    }"
  >
    <h3 class="text-base font-bold dark:text-gray-100">{{ title }}</h3>
    <p
      class="text-sm mt-4 truncate"
      :class="
        currentCourse
          ? 'text-[rgba(255,255,255,0.8)]'
          : 'text-[rgba(136,136,136,1)]'
      "
    >
      this is the course's description
    </p>

    <span class="absolute top-4 right-4 text-xs">{{ progress }}</span>
    <div
      v-if="!!count"
      class="tooltip count"
      :class="{
        'state-underway-count': courseState === 'underway',
        'state-finished-count': courseState === 'finished',
        'current-count': currentCourse,
      }"
      :data-tip="dataTip"
    >
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useActiveCourseId } from "~/composables/courses/activeCourse";

const props = defineProps<{
  title: string;
  id: number;
  count: number | undefined;
  progress: string | undefined;
}>();

const { activeCourseId } = useActiveCourseId();
const currentCourse = computed(() => activeCourseId.value == props.id);
const dataTip = computed(
  () => `Congratulations! you've completed the course ${props.count} times.`
);

const courseState = computed(() => {
  let state = "unplayed";
  if (props.progress) {
    if (props.progress === "100%") {
      state = "finished";
    } else {
      state = "underway";
    }
  }
  return state;
});
</script>

<style scoped>
.course-card {
  @apply flex flex-col w-[360px] h-[160px] sm:w-[500px] md:w-[340px] lg:w-[280px] xl:w-[260px] p-4 pb-6 border border-[rgba(164,175,191,1)] hover:shadow-lg hover:shadow-[rgba(164,175,191,0.5)] hover:border-[rgba(164,175,191,1)] rounded-xl transition-all duration-500 relative;
}

.count {
  @apply absolute bottom-1.5 right-2 text-xs w-7 h-5 leading-5 text-center text-white bg-[rgba(164,175,191,1)] rounded-md;
}

.state-underway {
  @apply border-[rgba(242,100,25,1)] hover:shadow-[rgba(242,100,25,0.5)] hover:border-[rgba(242,100,25,1)];
}

.state-underway-count {
  @apply bg-[rgba(242,100,25,1)];
}

.state-finished {
  @apply border-[rgba(151,71,255,1)] hover:shadow-[rgba(151,71,255,0.5)] hover:border-[rgba(151,71,255,1)];
}

.state-finished-count {
  @apply bg-[rgba(151,71,255,1)];
}

.current-card {
  @apply bg-[rgba(242,100,25,1)] border-[rgba(242,100,25,1)] text-white hover:shadow-[rgba(242,100,25,0.5)] hover:border-[rgba(242,100,25,1)];
}

.current-count {
  @apply bg-white text-[rgba(242,100,25,1)];
}
</style>
