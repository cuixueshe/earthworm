<template>
  <div class="text-center">
    <div class="mt-10 mb-4 text-2xl dark:text-gray-50 relative group">
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
        class="absolute top-0 right-[-50px] h-full hidden group-hover:flex justify-center items-center flex-shrink-0"
      >
        <div
          class="h-7 leading-7 border border-gray-500 rounded-xl text-base px-2 cursor-pointer text-gray-500"
          @click="() => playStatement(courseStore.currentStatement?.startTime)"
        >
          <PlayerSvg
            :is-around="false"
            class="dark:fill-white"
          ></PlayerSvg>
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
  () =>
    courseStore.currentStatement?.chinese ||
    "To be, or not to be, that is the question"
);
const englishStatement = computed(
  () =>
    courseStore.currentStatement?.english ||
    "To be, or not to be, that is the question"
);
const statementStartTime = computed(() =>
  courseStore.currentStatement?.startTime
    ? formatTime(courseStore.currentStatement?.startTime)
    : ""
);

function formatTime(time: string) {
  return time.split(".")[0];
}
</script>
