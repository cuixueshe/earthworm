<template>
  <div class="text-center">
    <div class="group relative mb-4 mt-10 text-2xl dark:text-gray-50">
      <template v-if="currentTip === TipItem.Chinese">
        {{ chineseStatement }}
      </template>
      <template v-else-if="currentTip === TipItem.English">
        {{ englishStatement }}
      </template>
      <template v-else-if="currentTip === TipItem.AllShow">
        <div class="flex flex-col">
          <span> {{ chineseStatement }} </span>
          <span> {{ englishStatement }} </span>
        </div>
      </template>
      <div
        v-if="courseStore.currentStatement?.startTime"
        class="absolute right-[-50px] top-0 hidden h-full flex-shrink-0 items-center justify-center group-hover:flex"
      >
        <div
          class="h-7 cursor-pointer rounded-xl border border-gray-500 px-2 text-base leading-7 text-gray-500"
          @click="() => playStatement(courseStore.currentStatement?.startTime)"
        >
          <!-- how to use -->
          <!-- <span class="ph:play" /> -->

          <svg
            class="ml-1 inline-block h-3 w-3 cursor-pointer dark:fill-white"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M102.425742 102.393565v819.148516l614.361387-409.574258z"
              fill=""
              p-id="5204"
            ></path>
            <path
              d="M153.622524 102.393565v819.148516l614.361387-409.574258z"
              fill=""
              p-id="5205"
            ></path>
            <path
              d="M259.599863 15.871003V834.507551l619.481066-405.478515z"
              fill=""
              p-id="5206"
            ></path>
            <path
              d="M261.135767 189.428094l-1.535904 818.636549L875.497154 599.002353z"
              fill=""
              p-id="5207"
            ></path>
            <path
              d="M204.819306 102.393565m-102.393564 0a102.393565 102.393565 0 1 0 204.787129 0 102.393565 102.393565 0 1 0-204.787129 0Z"
              fill=""
              p-id="5208"
            ></path>
            <path
              d="M819.180694 409.574258c-56.316461 0-102.393565 46.077104-102.393565 102.393565s46.077104 100.345693 102.393565 102.393564c57.852364 2.047871 102.905532-45.053168 102.393564-102.393564-0.511968-56.316461-46.077104-102.393565-102.393564-102.393565zM204.819306 819.148517c-56.316461 0-102.393565 46.077104-102.393564 102.393564s46.077104 100.345693 102.393564 102.393565c53.756621 2.047871 100.857661-45.053168 102.393565-102.393565 1.535903-56.316461-46.077104-102.393565-102.393565-102.393564z"
              fill=""
              p-id="5209"
            ></path>
          </svg>

          <span class="pl-1">{{ statementStartTime }}</span>
        </div>
      </div>
    </div>
    <MainQuestionInput></MainQuestionInput>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useMusicMode } from "~/composables/main/music";
import { useCourseStore } from "~/store/course";
import PlayerSvg from "./PlayerSvg.vue";
import { TipItem, useTips } from "./tips";

const courseStore = useCourseStore();
const { currentTip } = useTips();
const { playStatement } = useMusicMode();

const chineseStatement = computed(
  () => courseStore.currentStatement?.chinese || "To be, or not to be, that is the question",
);
const englishStatement = computed(
  () => courseStore.currentStatement?.english || "To be, or not to be, that is the question",
);
const statementStartTime = computed(() =>
  courseStore.currentStatement?.startTime
    ? formatTime(courseStore.currentStatement?.startTime)
    : "",
);

function formatTime(time: string) {
  return time.split(".")[0];
}
</script>
