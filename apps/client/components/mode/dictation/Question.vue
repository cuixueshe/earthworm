<template>
  <div>
    <MainQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";

import { play } from "~/composables/main/dictation";
import { useCourseStore } from "~/store/course";

usePlayEnglishSound();

function usePlayEnglishSound() {
  onMounted(() => {
    const pauseSound = play();
    const courseStore = useCourseStore();

    watch(
      () => courseStore.statementIndex,
      () => {
        pauseSound();
        play();
      },
    );

    onUnmounted(() => {
      pauseSound();
    });
  });
}
</script>
