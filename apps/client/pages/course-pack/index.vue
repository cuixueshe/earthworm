<template>
  <div class="px-4 md:px-0">
    <h2 class="my-10 text-2xl font-bold">多课程包</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="coursePack in coursePacks"
        :key="coursePack.id"
        class="relative transform overflow-hidden transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
      >
        <div
          class="cursor-pointer rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800"
          @click="handleGoToCoursePack(coursePack)"
        >
          <h2>
            {{ coursePack.title }}
          </h2>
          <p>({{ coursePack.isFree ? "免费" : "会员专属" }})</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#app";
import { ref } from "vue";

import type { CoursePack } from "~/api/coursePack";
import { fetchCoursePacks } from "~/api/coursePack";

const coursePacks = ref<CoursePack[]>([]);

getCoursePacks();

async function getCoursePacks() {
  const res = await fetchCoursePacks();
  coursePacks.value = res;
}

function handleGoToCoursePack(coursePack: CoursePack) {
  if (coursePack.isFree) {
    navigateTo(`/course-pack/${coursePack.id}`);
  } else {
    // 看看是不是会员 不是的话 直接弹出消息告知 需要是会员
    // TODO 还没有检测是不是会员的功能函数
    console.log("需要是会员");
  }
}
</script>

<style></style>
