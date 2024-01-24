<template>
  <Game></Game>
</template>

<script setup lang="ts">
import Game from "~/components/main/Game.vue";
import { useCoursesStore } from "~/store/courses";

const route = useRoute();
const coursesStore = useCoursesStore();

await coursesStore.setup(+route.params.id);
</script>

<style scoped></style>
