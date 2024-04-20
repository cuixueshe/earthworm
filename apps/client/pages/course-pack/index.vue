<template>
  <h2>Course Pack</h2>
  <ul>
    <li v-for="coursePack in coursePacks">
      <a :href="'/course-pack/' + coursePack.id"> {{ coursePack.title }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { CoursePack } from "~/api/coursePack";
import { fetchCoursePacks } from "~/api/coursePack";

const coursePacks = ref<CoursePack[]>([]);

getCoursePacks();

async function getCoursePacks() {
  const res = await fetchCoursePacks();
  coursePacks.value = res;
}
</script>

<style></style>
