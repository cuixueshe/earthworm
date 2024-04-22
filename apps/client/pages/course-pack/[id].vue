<template>
  <div
    class="px-4 md:px-0"
    v-if="coursePack"
  >
    <h2 class="my-10 text-2xl font-bold">{{ coursePack.title }}</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="course in coursePack.courses"
        :key="course.id"
        class="relative transform overflow-hidden transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110"
      >
        <div class="cursor-pointer rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2>
            <a :href="'/course-pack/' + course.id"> {{ course.title }}</a>
          </h2>
          <!-- <p class="mt-2 text-gray-600">{{ course.description }}</p> -->
        </div>
      </div>
    </div>
  </div>
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
