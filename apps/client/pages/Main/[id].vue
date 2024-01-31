<template>
  <div class="w-full flex flex-col pt-2">
    <Tool></Tool>
    <Game></Game>
  </div>
</template>

<script setup lang="ts">
import Game from '~/components/main/Game.vue';
import Tool from '~/components/main/Tool.vue';
import { useCourseStore } from "~/store/course";
import { useGameMode } from '~/composables/main/game';

definePageMeta({
  middleware: 'auth'
})

const route = useRoute();
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode()

showQuestion()

onMounted(async () => {
  await coursesStore.setup(+route.params.id);
})

</script>
