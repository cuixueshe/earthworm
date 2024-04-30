<template>
  <div class="flex w-full flex-col pt-2">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>

    <template v-else>
      <h2 class="mb-4 border-b py-2 text-center text-3xl dark:border-gray-600">
        {{ coursePackStore.currentCoursePack?.title }}
      </h2>
      <div class="scrollbar-hide h-full">
        <div
          class="grid h-[79vh] grid-cols-1 justify-start gap-8 overflow-y-auto overflow-x-hidden pb-96 pl-0 pr-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <template
            v-for="course in coursePackStore.currentCoursePack?.courses"
            :key="course.id"
          >
            <CoursesCourseCard
              :title="course.title"
              :id="course.id"
              :count="course.completionCount"
              :coursePackId="course.coursePackId"
              @click="handleChangeCourse(course.id)"
            />
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { ref } from "vue";
import { useRoute } from "vue-router";

import { useActiveCourseMap } from "~/composables/courses/activeCourse";
import { useCoursePackStore } from "~/store/coursePack";

const isLoading = ref(false);
const route = useRoute();
const coursePackStore = useCoursePackStore();
const coursePackId = route.params.id as string;
const { updateActiveCourseMap } = useActiveCourseMap();

setup();

async function setup() {
  // 只在初始化的时候拉取一次数据
  // 后续只更新课程的完成次数数据
  if (!coursePackStore.currentCoursePack) {
    isLoading.value = true;
    await coursePackStore.setupCoursePack(coursePackId);
    isLoading.value = false;
  }
}

function handleChangeCourse(courseId: string) {
  updateActiveCourseMap(coursePackId, courseId);
  navigateTo(`/game/${coursePackId}/${courseId}`);
}
</script>

<style></style>
