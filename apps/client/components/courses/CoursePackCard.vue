<template>
  <div
    class="card w-72 shrink-0 cursor-pointer bg-base-100 shadow-xl"
    @click="handleGoToCoursePack(coursePack)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "#imports";

import type { CoursePack } from "~/api/coursePack";

interface Props {
  coursePack: CoursePack;
}

defineProps<Props>();

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

<style scoped></style>
