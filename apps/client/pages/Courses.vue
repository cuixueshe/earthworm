<template>
  <div class="relative flex flex-col w-full">
    <h2 class="py-2 mb-4 text-3xl text-center border-b dark:border-gray-600">
      星荣零基础学英语课程
    </h2>
    <div class="h-full scrollbar-hide">
      <div
        v-if="courses.length"
        class="h-[79vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-0 pr-4 pb-96 overflow-x-hidden overflow-y-auto gap-8 justify-start"
      >
        <template
          v-for="course in courses"
          :key="course.id"
        >
          <NuxtLink
            :href="`/main/${course.id}`"
            @click="handleChangeCourse(course)"
          >
            <CoursesCourseCard
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
import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { type Course } from "~/store/course";

const courses = ref<Course[]>([]);
const { updateActiveCourseId } = useActiveCourseId();

onMounted(async () => {
  courses.value = await getCourses();
});

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

function handleChangeCourse(course: Course) {
  updateActiveCourseId(course.id);
}
</script>
