<template>
  <div class="w-full flex flex-col pt-2 relative">
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
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "~/components/Loading.vue";
import Game from "~/components/main/Game.vue";
import Tool from "~/components/main/Tool.vue";
import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from "~/store/course";

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(true);
const route = useRoute();
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode();

showQuestion();

onMounted(async () => {
  await coursesStore.setup(Number(route.params.id));
  isLoading.value = false;
});
</script>
