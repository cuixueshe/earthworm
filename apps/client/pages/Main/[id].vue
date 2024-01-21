<template>
  <div class="flex flex-col h-full">
    <Header></Header>
    <main>
      <Game></Game>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "~/components/main/Header.vue";
import Game from "~/components/main/Game.vue";
import { useCoursesStore } from "~/store/courses";

const route = useRoute();
const coursesStore = useCoursesStore();

await coursesStore.fetchCourseData(route.params.id as string);
</script>

<style scoped></style>
