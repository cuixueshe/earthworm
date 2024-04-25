<template>
  <div class="border-1 rounded-xl px-4 md:px-0">
    <h2 class="my-10 text-2xl font-bold">最近玩过课程包列表</h2>
    <div class="flex flex-wrap gap-4">
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="card w-72 shrink-0 bg-base-100 shadow-xl"
      >
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ coursePack.title }}</h2>
          <p>这是一个课程描述</p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              @click="handleGotoCourseList(coursePack.coursePackId)"
            >
              课程列表
            </button>
            <button
              class="btn btn-primary"
              @click="handleContinueGame(coursePack.coursePackId, coursePack.courseId)"
            >
              继续游戏
            </button>
          </div>
        </div>
      </div>
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="card w-72 shrink-0 shrink-0 bg-base-100 shadow-xl"
      >
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ coursePack.title }}</h2>
          <p>这是一个课程描述</p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-primary"
              @click="handleGotoCourseList(coursePack.coursePackId)"
            >
              课程列表
            </button>
            <button
              class="btn btn-primary"
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
