<template>
  <div
    id="contents"
    class="absolute left-0 z-20 overflow-x-hidden bg-white border-l-4 shadow select-none top-20 w-80 border-fuchsia-500 dark:bg-slate-800"
    :class="[isShowContents() && 'show']"
    v-bind="containerProps"
  >
    <div
      class="px-2"
      v-bind="wrapperProps"
    >
      <div
        v-for="item in list"
        :key="item.data.id"
        :class="getItemClassNames(item.index)"
        @click="jumpTo(item.index)"
      >
        <div
          class="flex py-1 whitespace-pre-wrap border-b tooltip dark:border-slate-600"
          :class="{ 'tooltip-bottom': item.index <= 1 }"
          :data-tip="item.data.english + '\n' + item.data.chinese"
        >
          <div class="w-12 text-center">{{ item.index + 1 }}</div>
          <div class="flex-1 text-left truncate">
            {{ item.data.chinese }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from "~/store/course";
import { useContent } from "./useContents";

const coursesStore = useCourseStore();
const { hideContents, isShowContents, watchClickOutside } = useContent();

const { showQuestion } = useGameMode();

const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  contentsList.value,
  { itemHeight: 35 }
);

onMounted(async () => {
  scrollTo(coursesStore.statementIndex);
  watchClickOutside(containerProps.ref.value as HTMLElement);
});

function isActive(index: number) {
  return coursesStore.statementIndex === index;
}

function getItemClassNames(index: number) {
  const classNames: string[] = [];
  if (isActive(index)) {
    classNames.push("text-fuchsia-500");
  }
  classNames.push("hover:text-fuchsia-500 cursor-pointer");
  return classNames;
}

function jumpTo(index: number) {
  hideContents();
  coursesStore.toSpecificStatement(index);
  showQuestion()  
}
</script>

<style scoped>
#contents {
  height: 0rem;
  opacity: 0;
  transition: all 0.5s;
}

#contents::-webkit-scrollbar {
  display: none;
}

#container::-webkit-scrollbar {
  display: none;
}

#contents.show {
  opacity: 1;
  /* 刚好显示 12 个题目 */
  height: 24.6rem;
}
</style>
