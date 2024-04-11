<template>
  <div class="text-center">
    <div class="mt-10 mb-4 text-2xl dark:text-gray-50">
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
    </div>
    <QuestionInput></QuestionInput>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import QuestionInput from "~/components/main/QuestionInput/QuestionInput.vue";
import { useCourseStore } from "~/store/course";
import { TipItem, useTips } from "./tips";

const courseStore = useCourseStore();
const { currentTip } = useTips();

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
</script>
