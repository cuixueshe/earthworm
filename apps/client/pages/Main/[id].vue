<template>
  <div class="w-full flex flex-col pt-2">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <Tool></Tool>
      <Game></Game>
    </template>
  </div>
</template>

<script setup lang="ts">
import Game from '~/components/main/Game.vue';
import Tool from '~/components/main/Tool.vue';
import Loading from '~/components/Loading.vue';
import { useCourseStore } from "~/store/course";
import { useGameMode } from '~/composables/main/game';

definePageMeta({
  middleware: 'auth'
})

const isLoading = ref(true)
const route = useRoute();
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode()

showQuestion()

onMounted(async () => {
  await coursesStore.setup(+route.params.id);
  isLoading.value = false
})

</script>
