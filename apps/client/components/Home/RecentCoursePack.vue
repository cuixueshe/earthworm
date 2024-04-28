<template>
  <div class="border-1 rounded-xl px-4 md:px-0">
    <h2 class="my-10 text-2xl font-bold">最近玩过课程包</h2>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="card w-72 shrink-0 bg-base-100 shadow-xl"
      >
        <figure>
          <img
            src="~/assets/xingrong.avif"
            alt="Shoes"
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

import type { UserRecentCoursePackResponse } from "~/api/userCourseProgress";
import { fetchUserRecentCoursePacks } from "~/api/userCourseProgress";

const coursePacks = ref<UserRecentCoursePackResponse[]>([]);

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
