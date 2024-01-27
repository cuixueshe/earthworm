<template>
  <div class="relative flex-1 flex flex-col">
    <Game></Game>
    <Tool></Tool>
  </div>
</template>

<script setup lang="ts">
import Game from "~/components/main/Game.vue";
import Tool from '~/components/main/Tool.vue';
import { useCourseStore } from "~/store/course";

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();
const coursesStore = useCourseStore();

await coursesStore.setup(+route.params.id);
</script>
