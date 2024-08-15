<template>
  <div>
    <MainQuestionInput />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";

import { useCurrentStatementEnglishSound } from "~/composables/main/englishSound";
import { useCourseStore } from "~/store/course";

usePlayEnglishSound();
const { playSound } = useCurrentStatementEnglishSound();

function usePlayEnglishSound() {
  onMounted(() => {
    const pauseSound = playSound();
    const courseStore = useCourseStore();

    watch(
      () => courseStore.statementIndex,
      () => {
        pauseSound();
        playSound();
      },
    );

    onUnmounted(() => {
      pauseSound();
    });
  });
}
</script>
