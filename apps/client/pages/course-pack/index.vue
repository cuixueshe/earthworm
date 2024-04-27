<template>
  <div class="flex w-full flex-col pt-2">
    <h2 class="my-10 text-2xl font-bold">多课程包</h2>
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <template v-for="coursePack in coursePacks">
          <CoursePackCard :coursePack="coursePack"></CoursePackCard>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { CoursePack } from "~/api/coursePack";
import { fetchCoursePacks } from "~/api/coursePack";
import CoursePackCard from "~/components/courses/CoursePackCard.vue";

const coursePacks = ref<CoursePack[]>([]);

const isLoading = ref(true);
getCoursePacks();

async function getCoursePacks() {
  const res = await fetchCoursePacks();
  coursePacks.value = res;
  isLoading.value = false;
}
</script>

<style></style>
