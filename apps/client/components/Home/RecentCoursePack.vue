<template>
  <div class="border-1 w-full rounded-xl px-4 md:px-0">
    <h2 class="my-10 text-2xl font-bold">最近玩过课程包</h2>
    <div
      class="flex min-h-[360px] w-full flex-wrap items-center justify-center gap-4"
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
        class="card w-72 shrink-0 bg-base-100 shadow-xl"
      >
        <figure>
          <NuxtImg
            src="/images/xingrong.jpg"
            :placeholder="[288, 180]"
            width="288"
            height="180"
            class="rounded"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ coursePack.title }}</h2>
          <p>{{ coursePack.description }}</p>
          <div class="card-actions justify-end">
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
./helper
