<template>
  <div class="relative">
    <Game></Game>
    <Tool></Tool>
  </div>
</template>

<script setup lang="ts">
import Game from "~/components/main/Game.vue";
import Tool from '~/components/main/Tool.vue';
import { useCourseStore } from "~/store/course";

const route = useRoute();
const coursesStore = useCourseStore();

await coursesStore.setup(+route.params.id);
</script>

<style scoped></style>
~/store/course~/store/course-new