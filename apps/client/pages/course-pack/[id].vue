<template>
  <template v-if="coursePack">
    <h2>{{ coursePack.title }}</h2>

    <div>
      <div
        class="flex"
        v-for="course in coursePack.courses"
      >
        <a @click="handleClickCourse(course.id)">{{ course.title }}</a>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import type { CoursePack2 } from "~/api/coursePack";
import { fetchCoursePack } from "~/api/coursePack";

const router = useRouter();
const coursePack = ref<CoursePack2 | null>(null);

getCoursePack();

async function getCoursePack() {
  const res = await fetchCoursePack(1);
  coursePack.value = res;
}

function handleClickCourse(id: number) {
  router.push(`/game/${id}`);
}
</script>

<style></style>
