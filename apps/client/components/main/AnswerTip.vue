<template>
  <div
    class="absolute top-[-50px] left-0 w-full flex items-center justify-center text-xl dark:text-gray-50"
  >
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body relative">
        <div class="absolute top-1 right-2 mt-0">
          <button
            class="w-6 h-6 outline-none dark:text-gray-300 text-gray-400"
            @click="hiddenAnswerTip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
              />
            </svg>
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
