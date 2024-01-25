<template>
  <div class="fixed right-5 top-24 w-28 h-40 bg-pink-500">
    <div>
      <NuxtLink href="/courses"> 更多课程 </NuxtLink>
    </div>
    <div>{{ coursesStore.currentCourse.title }}</div>
    <div>
      <button @click="handleDoAgain">重新开始</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { useMode } from "./game";

const coursesStore = useCourseStore();
const { showQuestion } = useMode();

function handleDoAgain() {
  coursesStore.doAgain();
  showQuestion()
}
</script>

<style scoped></style>
~/store/course~/store/course-new