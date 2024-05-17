<template>
  <div class="flex min-h-80">
    <!-- Loading -->
    <div
      v-if="isLoading"
      class="flex flex-1 items-center justify-center"
    >
      <span class="loading loading-dots loading-md"></span>
    </div>

    <div
      v-else
      class="grid w-full grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-1 min-[850px]:grid-cols-2 xl:grid-cols-3"
    >
      <div
        class="course-pack-card"
        v-for="coursePack in coursePacks"
      >
        <img
          class="min-h-44 w-full bg-gray-300 object-cover dark:bg-gray-700"
          :src="coursePack.cover"
        />
        <div class="flex flex-1 flex-col p-4">
          <h2 class="truncate text-lg font-semibold">{{ coursePack.title }}</h2>
          <p class="my-2 line-clamp-2 min-h-[3em] text-sm text-gray-500">
            {{ coursePack.description }}
          </p>
          <div class="flex justify-between">
            <button
              class="btn btn-sm tw-btn-blue"
              @click="handleGotoCourseList(coursePack.coursePackId)"
            >
              课程列表
            </button>
            <button
              class="btn btn-success btn-sm text-white"
              @click="handleContinueGame(coursePack.coursePackId, coursePack.courseId)"
            >
              继续游戏
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { ref } from "vue";

import { useRecentCoursePack } from "./helper";

const { coursePacks, fetchCoursePacks } = useRecentCoursePack();

const isLoading = ref(false);

setup();

async function setup() {
  if (coursePacks.value.length === 0) {
    isLoading.value = true;
    await fetchCoursePacks();
    isLoading.value = false;
  } else {
    await fetchCoursePacks();
  }
}

function handleGotoCourseList(coursePackId: string) {
  navigateTo(`/course-pack/${coursePackId}`);
}

function handleContinueGame(coursePackId: string, courseId: string) {
  navigateTo(`/game/${coursePackId}/${courseId}`);
}
</script>

<style scoped>
.course-pack-card {
  @apply flex cursor-pointer flex-col overflow-hidden rounded-md rounded-t-xl border bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-900;
  @apply hover:text-purple-500 hover:shadow-even-lg hover:shadow-gray-300 hover:dark:text-purple-400 dark:hover:shadow-gray-500;
}
</style>
