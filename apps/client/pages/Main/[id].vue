<template>
  <div class="flex flex-col h-full">
    <!-- <Header></Header> -->
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

onMounted(async () => {
  await coursesStore.setup(+route.params.id);
});
</script>

<style scoped></style>
