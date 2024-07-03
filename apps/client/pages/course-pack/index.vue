<template>
  <div class="flex w-full flex-col">
    <h2 class="mb-4 text-center text-3xl dark:border-gray-600">课程包列表</h2>
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <div class="h-[79vh] overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div
          class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <template v-for="coursePack in coursePackStore.coursePacks">
            <CoursePackCard :coursePack="coursePack"></CoursePackCard>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import CoursePackCard from "~/components/courses/CoursePackCard.vue";
import { useCoursePackStore } from "~/store/coursePack";

const coursePackStore = useCoursePackStore();
const isLoading = ref(false);

setup();

async function setup() {
  // 课程包不会更新 所以初始化的时候只拉取一次数据就好了
  if (coursePackStore.coursePacks.length === 0) {
    isLoading.value = true;
    await coursePackStore.setupCoursePacks();
    isLoading.value = false;
  }
}
</script>

<style></style>
