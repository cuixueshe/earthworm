<template>
  <div class="px-4 md:px-0">
    <h2 class="my-10 text-2xl font-bold">最近玩过课程包列表</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="relative transform overflow-hidden transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
      >
        <div class="cursor-pointer rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2>{{ coursePack.title }}</h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">{{ coursePack.description }}</p>
          <div class="mt-4 flex items-center justify-between">
            <div
              class="btn btn-primary"
              @click="handleGotoCourseList(coursePack.coursePackId)"
            >
              课程列表
            </div>
            <div
              class="btn btn-primary"
              @click="handleContinueGame(coursePack.coursePackId, coursePack.courseId)"
            >
              继续游戏
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { ref } from "vue";

import type { UserRecentCoursePackVo } from "~/api/userCourseProgress";
import { fetchUserRecentCoursePacks } from "~/api/userCourseProgress";

const coursePacks = ref<UserRecentCoursePackVo[]>([]);

getUserRecentCoursePacks();

async function getUserRecentCoursePacks() {
  coursePacks.value = await fetchUserRecentCoursePacks();
}

function handleGotoCourseList(coursePackId: string) {
  navigateTo(`/course-pack/${coursePackId}`);
}

function handleContinueGame(coursePackId: string, courseId: string) {
  navigateTo(`/game/${coursePackId}/${courseId}`);
}
</script>
