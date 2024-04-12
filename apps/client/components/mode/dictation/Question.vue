<template>
  <div>
    <MainQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useCourseStore } from "~/store/course";
import { play } from "./dictation";

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
      }
    );

    onUnmounted(() => {
      pauseSound();
    });
  });
}
</script>
