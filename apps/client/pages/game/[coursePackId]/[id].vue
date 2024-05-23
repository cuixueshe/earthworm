<template>
  <div class="flex w-full flex-col pt-2">
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from "~/store/course";
import { useCoursePackStore } from "~/store/coursePack";

const isLoading = ref(true);
const route = useRoute();
const coursePackStore = useCoursePackStore();
const courseStore = useCourseStore();
const { showQuestion } = useGameMode();

showQuestion();

onMounted(async () => {
  const { coursePackId, id } = route.params;
  await courseStore.setup(coursePackId as string, id as string);
  await coursePackStore.setupCoursePack(coursePackId as string);
  isLoading.value = false;
});
</script>
