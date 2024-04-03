<template>
  <div>
    <QuestionInput></QuestionInput>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import QuestionInput from "~/components/main/QuestionInput/QuestionInput.vue";
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

<style lang="scss" scoped></style>
