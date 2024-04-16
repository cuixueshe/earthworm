<template>
  <div
    :ref="isActiveCourse ? 'activeCourseRef' : undefined"
    class="course-card"
    :class="{
      'state-finished': hasFinished,
      'current-card': isActiveCourse,
    }"
  >
    <h3 class="text-base font-bold">
      {{ title }}
    </h3>
    <p class="mt-4 text-sm truncate text-gray-500 dark:text-gray-400">
      {{ title }}的描述……（等你来写）
    </p>
    <div
      v-if="hasFinished"
      class="tooltip count"
      :data-tip="dataTip"
      :class="{
        'state-finished-count': hasFinished,
        'current-count': isActiveCourse,
      }"
    >
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useActiveCourseId } from "~/composables/courses/activeCourse";

const props = defineProps<{
  title: string;
  id: number;
  count: number | undefined;
}>();
const { activeCourseId } = useActiveCourseId();

const activeCourseRef = ref<HTMLDivElement>();
const hasFinished = computed(() => !!props.count);
const isActiveCourse = computed(() => activeCourseId.value == props.id);
const dataTip = computed(() => `恭喜您，当前课程已完成 ${props.count} 次 🎉`);

onMounted(() => {
  activeCourseRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
</script>

<style scoped>
.course-card {
  @apply w-full h-[160px] p-4 pb-6 border border-gray-400 rounded-xl transition-all duration-300 relative dark:text-gray-100;
  @apply hover:shadow-lg hover:text-purple-500 hover:dark:text-purple-400 hover:shadow-gray-300 dark:hover:shadow-gray-500;
}

.count {
  @apply absolute bottom-1.5 right-2 text-xs w-7 h-5 leading-5 text-center text-white rounded-md;
}

.state-finished {
  @apply border-2 border-emerald-500 hover:text-emerald-500 hover:dark:text-emerald-300 hover:shadow-emerald-200 dark:hover:shadow-emerald-700;
}

.state-finished-count {
  @apply bg-emerald-600;
}

.current-card {
  @apply border-2 border-purple-500 hover:text-purple-500 hover:dark:text-purple-300 hover:shadow-purple-200 dark:hover:shadow-purple-700;
}

.current-count {
  @apply bg-purple-600;
}
</style>
