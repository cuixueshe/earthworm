<template>
  <div class="absolute right-0 top-0 mt-12 text-sm dark:text-gray-50">
    <span class="mx-2">倍速</span>
    <select
      class="select select-ghost w-32"
      v-model="toolBarData.rate"
    >
      <option value="2">2.0X</option>
      <option value="1.5">1.5X</option>
      <option value="1">1.0X</option>
      <option value="0.5">0.5X</option>
    </select>

    <span class="mx-2">播放次数</span>
    <select
      class="select select-ghost w-32"
      v-model="toolBarData.times"
    >
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>

    <span class="mx-2">播放间隔</span>
    <select
      class="select select-ghost w-32"
      v-model="toolBarData.interval"
    >
      <option value="10000">10s</option>
      <option value="5000">5s</option>
      <option value="3000">3s</option>
      <option value="1000">1s</option>
    </select>

    <button
      @click="handleReset"
      class="btn btn-primary mr-2"
    >
      重置
    </button>
    <button
      @click="handlePlay"
      class="btn btn-secondary"
    >
      重新播放
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";

import { useQuestionInput } from "~/components/main/QuestionInput/questionInputHelper";
import { play, useToolbar } from "./dictation";

const { focusInput } = useQuestionInput();

const { toolBarData, recoverToolBarData, saveToolBarData, resetToolBarData } = useToolbar();

onMounted(() => {
  recoverToolBarData();
});

watch(toolBarData, () => {
  saveToolBarData();
});

function handleReset() {
  resetToolBarData();
}

function handlePlay() {
  play();
  focusInput();
}
</script>

<style scoped></style>
