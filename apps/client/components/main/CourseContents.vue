<template>
  <UModal v-model="contentsVisible">
    <UContainer
      :ui="{
        base: 'w-[90vw] h-[80vh] flex flex-col',
        constrained: 'max-w-[880px] max-h-[880px]',
      }"
    >
      <CommonModalHeader
        title="课程目录"
        @close="hideCourseContents"
      />
      <!-- 添加选项菜单 -->
      <div class="mb-4 flex justify-end">
        <USelect
          v-model="filterOption"
          :options="options"
        >
        </USelect>
      </div>
      <div class="h-full space-y-3 overflow-y-auto">
        <div
          v-for="(item, index) in filteredContentsList"
          :key="item.id"
          ref="itemRefs"
          class="flex items-center justify-between rounded-lg bg-purple-100 p-4 transition-colors duration-300 hover:bg-purple-200 dark:bg-purple-700 dark:hover:bg-purple-600"
          @click="jumpTo(index, item)"
          :class="{ 'cursor-pointer': !item.isMastered, 'cursor-not-allowed': item.isMastered }"
        >
          <div class="group flex w-full flex-grow">
            <div class="mr-4 flex w-6 flex-shrink-0 flex-col items-center justify-center">
              <span class="text-lg font-semibold text-purple-600 dark:text-purple-300">
                {{ index + 1 }}
              </span>
              <UIcon
                v-if="item.isMastered"
                name="i-icon-park-outline:correct"
                class="mt-1 h-5 w-5 text-green-700 dark:text-green-500"
              ></UIcon>
            </div>
            <div class="flex-grow overflow-hidden">
              <div
                class="truncate text-lg font-bold text-purple-800 group-hover:text-clip group-hover:whitespace-normal dark:text-white"
              >
                {{ item.english }}
              </div>
              <div
                class="truncate text-lg text-purple-600 group-hover:text-clip group-hover:whitespace-normal dark:text-purple-300"
              >
                {{ item.chinese }}
              </div>
              <div
                class="truncate text-lg text-gray-500 group-hover:text-clip group-hover:whitespace-normal dark:text-gray-400"
              >
                {{ item.soundmark }}
              </div>
            </div>
            <div
              @click=""
              class="flex w-11 flex-shrink-0 cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <UTooltip text="播放发音">
                <UIcon
                  name="i-ph-speaker-simple-high"
                  class="ml-1 inline-block h-7 w-7 cursor-pointer"
                  @click="handlePlayEnglishSound($event, item.english)"
                ></UIcon>
              </UTooltip>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </UModal>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";

import { playEnglish } from "~/composables/main/englishSound";
import { useGameMode } from "~/composables/main/game";
import { useCourseContents } from "~/composables/main/useCourseContents";
import { useCourseStore } from "~/store/course";

const { contentsVisible, hideCourseContents } = useCourseContents();

const itemRefs = ref<(HTMLElement | null)[]>([]);
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode();
const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

const filterOption = ref("all"); // 新增过滤选项
const options = [
  { label: "全部", value: "all" },
  { label: "已经掌握", value: "mastered" },
  { label: "未掌握", value: "notMastered" },
];
const filteredContentsList = computed(() => {
  if (filterOption.value === "mastered") {
    return contentsList.value.filter((item) => item.isMastered);
  } else if (filterOption.value === "notMastered") {
    return contentsList.value.filter((item) => !item.isMastered);
  }
  return contentsList.value; // 默认显示全部
});

function jumpTo(index: number, item: any) {
  if (item.isMastered) {
    return;
  }
  showQuestion();
  hideCourseContents();
  coursesStore.toSpecificStatement(index);
}

function handlePlayEnglishSound(event: Event, english: string) {
  event.stopPropagation();
  playEnglish(english);
}

watch(
  () => contentsVisible.value,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        const targetElement = itemRefs.value[coursesStore.statementIndex];
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  },
);
</script>

<style scoped></style>
