<template>
  <div
    class="absolute flex items-center justify-center w-3/4 text-xl left-1/2 translate-x-[-50%] dark:text-gray-50"
    :class="
      currentGameMode === GameMode.ChineseToEnglish ? 'top-40' : ' top-32'
    "
  >
    <div class="shadow-xl card bg-base-100">
      <div class="relative card-body">
        <div class="absolute mt-0 top-1 right-2">
          <button
            class="w-6 h-6 text-gray-400 outline-none dark:text-gray-300"
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
import { GameMode, useGameMode } from "~/composables/user/gameMode";
import { useCourseStore } from "~/store/course";

const courseStore = useCourseStore();
const { hiddenAnswerTip } = useAnswerTip();
const { currentGameMode } = useGameMode();
</script>
