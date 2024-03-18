<template>
  <div class="relative w-full flex flex-col">
    <h2 class="my-4 text-3xl text-blue-500">English Course</h2>
    <div class="h-full scrollbar-hide">
      <div
        v-if="courses.length"
        class="h-[79vh] flex flex-wrap p-1 pb-96 overflow-x-hidden overflow-y-auto gap-8 justify-start"
      >
        <template
          v-for="course in courses"
          :key="course.id"
        >
          <NuxtLink
            :href="`/main/${course.id}`"
            @click="handleChangeCourse(course)"
          >
            <CourseCard
              :title="course.title"
              :id="course.id"
              :count="course.count"
            />
          </NuxtLink>
        </template>
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { fetchCourses } from "~/api/course";
import { fetchCourseHistory } from "~/api/courseHistory";

import Loading from "~/components/Loading.vue";
import CourseCard from "~/components/courses/CourseCard.vue";

import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { useCourseTime } from "~/composables/courses/time";
import { type Course } from "~/store/course";

const { activeCourseId, updateActiveCourseId } = useActiveCourseId();
const { restCourseTime } = useCourseTime();
const courses = ref<Course[]>([]);

async function getCourseHistory() {
  const res = await fetchCourseHistory();
  const historyMap: Map<number, any> = new Map();
  res.forEach((item) => {
    historyMap.set(item.courseId, {
      count: item.completionCount,
    });
  });
  return historyMap;
}

async function getCourses() {
  const completionMap = await getCourseHistory();
  const courses = await fetchCourses();
  return courses.map((item) => {
    if (completionMap.has(item.id)) {
      return {
        ...item,
        ...completionMap.get(item.id),
      };
    } else {
      return item;
    }
  });
}

onMounted(async () => {
  courses.value = await getCourses();
});

function handleChangeCourse(course: Course) {
  if (activeCourseId.value === course.id) return;
  updateActiveCourseId(course.id);
  restCourseTime();
}
</script>
