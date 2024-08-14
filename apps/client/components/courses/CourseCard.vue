<template>
  <div
    :ref="isActiveCourse ? 'activeCourseRef' : undefined"
    :class="[
      'relative h-[160px] w-full cursor-pointer rounded-xl border border-gray-400 p-4 pb-6 transition-all duration-300 dark:text-gray-100',
      'hover:text-purple-500 hover:shadow-lg hover:shadow-gray-300 hover:dark:text-purple-400 dark:hover:shadow-gray-500',
      {
        'border-2 border-emerald-500 hover:text-emerald-500 hover:shadow-emerald-200 hover:dark:text-emerald-300 dark:hover:shadow-emerald-700':
          hasFinished,
        'border-2 border-purple-500 hover:text-purple-500 hover:shadow-purple-200 hover:dark:text-purple-300 dark:hover:shadow-purple-700':
          isActiveCourse,
      },
    ]"
  >
    <h3 class="text-base font-bold">
      {{ title }}
    </h3>
    <p
      class="mt-4 line-clamp-3 text-sm text-gray-500 dark:text-gray-400"
      :title="description"
    >
      {{ description }}
    </p>
    <div
      v-if="hasFinished"
      :class="[
        'absolute bottom-1.5 right-2 h-5 w-7 rounded-md text-center text-xs leading-5 text-white',
        {
          'bg-emerald-600': hasFinished,
          'bg-purple-600': isActiveCourse,
        },
      ]"
    >
      <UTooltip :text="dataTip">
        {{ count }}
      </UTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useActiveCourseMap } from "~/composables/courses/activeCourse";

const props = defineProps<{
  title: string;
  id: string;
  count: number | undefined;
  coursePackId: string;
  description: string;
}>();
const { activeCourseMap } = useActiveCourseMap();

const activeCourseRef = ref<HTMLDivElement>();
const hasFinished = computed(() => !!props.count);
const isActiveCourse = computed(() => activeCourseMap.value[props.coursePackId] == props.id);
const dataTip = computed(() => `恭喜您，当前课程已完成 ${props.count} 次 🎉`);

onMounted(() => {
  activeCourseRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
</script>

<style scoped></style>
