<template>
  <div
    class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full z-10"
  >
    <button
      @click="handlePre"
      :class="{
        'opacity-50 cursor-not-allowed': isFirst,
        'hover-effect': !isFirst,
      }"
      class="btn-wrapper"
    >
      <div class="left-btn w-6 h-6"></div>
    </button>
    <button
      @click="handleNext"
      :class="{
        'opacity-50 cursor-not-allowed': isLast,
        'hover-effect': !isLast,
      }"
      class="btn-wrapper"
    >
      <div class="right-btn w-6 h-6"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCourseStore } from "~/store/course";
const courseStore = useCourseStore();

const isFirst = computed(() => courseStore.statementIndex === 0);
const isLast = computed(
  () => courseStore.statementIndex === courseStore.totalQuestionsCount
);

function handlePre() {
  if (isFirst.value) return;
  courseStore.toPreviousStatement();
}

function handleNext() {
  if (isLast.value) return;
  courseStore.toNextStatement();
}
</script>

<style scoped>
.btn-wrapper {
  @apply w-12 h-12 flex justify-center items-center text-gray-400 dark:text-white;
}

.hover-effect {
  @apply hover:text-fuchsia-500 hover:scale-110 transition-all duration-300;
}

.left-btn {
  border-top: 0.15rem solid;
  border-right: 0.15rem solid;
  transform: rotate(-135deg);
  position: relative;
  left: 0.1rem;
}

.right-btn {
  border-top: 0.15rem solid;
  border-right: 0.15rem solid;
  transform: rotate(45deg);
  position: relative;
  right: 0.1rem;
}
</style>
