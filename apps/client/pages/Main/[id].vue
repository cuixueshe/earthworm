<template>
  <div class="w-full flex flex-col pt-2 relative">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <MainTool />
      <MainGame />
    </template>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useMusicChapter } from "~/composables/courses/music";
import { useGameMode } from "~/composables/main/game";
import {
  GameMode,
  useGameMode as useGameModeInUser,
} from "~/composables/user/gameMode";
import { useCourseStore } from "~/store/course";

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(true);
const route = useRoute();
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode();
const { currentGameMode } = useGameModeInUser();
const { currentMusic, currentMusicCourse } = useMusicChapter();

showQuestion();

async function getCourse() {
  if (currentGameMode.value === GameMode.Music && currentMusicCourse.value) {
    coursesStore.setupMusic(currentMusicCourse.value);
  } else {
    await coursesStore.setup(Number(route.params.id));
  }

  isLoading.value = false;
}

onMounted(async () => {
  await getCourse();
});
</script>
