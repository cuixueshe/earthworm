<template>
  <div class="h-full pt-2">
    <Tool></Tool>
    <Game></Game>
    <ProgressRank />
  </div>
</template>

<script setup lang="ts">
import Game from '~/components/main/Game.vue';
import Tool from '~/components/main/Tool.vue';
import ProgressRank from '~/components/rank/ProgressRank.vue';
import { useCourseStore } from "~/store/course";

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();
const coursesStore = useCourseStore();

await coursesStore.setup(+route.params.id);
</script>
