<template>
  <div
    class="absolute left-1/2 top-36 flex w-3/4 translate-x-[-50%] items-center justify-center text-xl dark:text-gray-50"
  >
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body relative">
        <div class="absolute right-2 top-1 mt-0">
          <button
            class="h-6 w-6 text-gray-400 outline-none dark:text-gray-300"
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
