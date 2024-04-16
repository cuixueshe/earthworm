<template>
  <div
    class="absolute left-1/2 top-36 flex w-3/4 translate-x-[-50%] items-center justify-center text-xl dark:text-gray-50"
  >
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body relative">
        <div class="absolute right-2 top-1 mt-0">
          <button
            class="h-5 w-5 text-gray-400 outline-none dark:text-gray-300"
            @click="hiddenAnswerTip"
          >
            <i class="i-ph-x-bold h-full w-full"></i>
          </button>
        </div>

        <div>{{ courseStore.currentStatement?.english }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnswerTip } from "~/composables/main/answerTip";
import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();
const { hiddenAnswerTip } = useAnswerTip();
</script>
