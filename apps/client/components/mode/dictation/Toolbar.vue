<template>
  <div class="absolute right-0 top-0 mt-12 text-sm dark:text-gray-50">
    <template
      v-for="option in TOOLBAR_LIST"
      :key="option.key"
    >
      <span class="mx-2">{{ option.label }}：</span>
      <select
        class="select select-ghost h-4 w-24 md:h-8 md:w-24"
        v-model="toolBarData[option.key]"
      >
        <option
          v-for="item in option.options"
          :key="item.value"
          :value="item.value"
          class="h-2"
        >
          {{ item.label }}
        </option>
      </select>
    </template>

    <button
      @click="handleReset"
      class="btn btn-primary mx-3"
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

const TOOLBAR_LIST = [
  {
    label: "倍速",
    key: "rate",
    options: [
      {
        label: "2.0X",
        value: "2",
      },
      {
        label: "1.5X",
        value: "1.5",
      },
      {
        label: "1.0X",
        value: "1",
      },
      {
        label: "0.5X",
        value: "0.5",
      },
    ],
  },
  {
    label: "播放次数",
    key: "times",
    options: [
      {
        label: "4",
        value: "4",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "1",
        value: "1",
      },
    ],
  },
  {
    label: "播放间隔",
    key: "interval",
    options: [
      {
        label: "10s",
        value: "10000",
      },
      {
        label: "5s",
        value: "5000",
      },
      {
        label: "3s",
        value: "3000",
      },
      {
        label: "1s",
        value: "1000",
      },
    ],
  },
];
</script>

<style scoped></style>
