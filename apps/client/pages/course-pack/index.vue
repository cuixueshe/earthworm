<template>
  <div class="flex w-full flex-col pt-2">
    <h2 class="my-10 text-2xl font-bold">多课程包</h2>
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <template v-for="coursePack in coursePackStore.coursePacks">
          <CoursePackCard :coursePack="coursePack"></CoursePackCard>
        </template>
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
