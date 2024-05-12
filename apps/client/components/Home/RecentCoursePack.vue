<template>
  <div class="border-1 w-full rounded-sm px-4 md:px-0">
    <div
      class="flex min-h-[350px] w-full flex-wrap items-center justify-center gap-4"
      v-if="isLoading"
    >
      <span class="loading loading-dots loading-md"></span>
    </div>
    <div
      v-else
      class="flex flex-wrap gap-4"
    >
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="card flex w-72 shrink-0 flex-col gap-2 bg-base-100 shadow transition-shadow hover:shadow-lg"
      >
        <figure>
          <NuxtImg
            :src="coursePack.cover"
            :placeholder="[288, 180]"
            width="288"
            height="180"
          />
        </figure>
        <div class="mt-2 p-4">
          <h2 class="card-title dark:text-white">{{ coursePack.title }}</h2>
          <div class="max-h-30 mt-2 flex min-h-20 flex-grow flex-col truncate text-gray-400">
            <span> 课程简介 </span>
            <span class="text-[14px]">
              {{ coursePack.description }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="btn btn-primary btn-sm"
              @click="handleGotoCourseList(coursePack.coursePackId)"
            >
              课程列表
            </button>
            <button
              class="btn btn-primary btn-secondary btn-sm"
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
