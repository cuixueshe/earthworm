<template>
  <div
    id="contents"
    class="absolute left-0 top-20 z-10 w-80 select-none overflow-y-auto border-l-4 border-fuchsia-500 bg-white shadow dark:bg-slate-800"
    :class="[isShowContents() && 'show']"
    ref="contentsRef"
  >
    <div class="px-2">
      <div
        v-for="(item, index) in contentsList"
        :key="item.id"
        :class="getItemClassNames(index)"
        @click="jumpTo(index, item)"
      >
        <UTooltip :text="`${item.english} ${item.chinese}`">
          <div class="flex whitespace-pre-wrap border-b py-1 dark:border-slate-600">
            <div class="w-12 text-center">{{ index + 1 }}</div>
            <div class="flex-1 truncate text-left">
              {{ item.chinese }}
              {{ item.isMastered ? "✅" : "" }}
            </div>
          </div>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import { useGameMode } from "~/composables/main/game";
import { useCourseStore } from "~/store/course";
import { useContent } from "./useContents";

const coursesStore = useCourseStore();
const { showQuestion } = useGameMode();
const { hideContents, isShowContents, watchClickOutside } = useContent();

const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

const contentsRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contentsRef.value) {
    watchClickOutside(contentsRef.value);
  }
});

watch(
  () => coursesStore.statementIndex,
  (newIndex) => {
    scrollToIndex(newIndex);
  },
);

function scrollToIndex(index: number) {
  if (contentsRef.value) {
    const element = contentsRef.value.children[0].children[index] as HTMLElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }
}

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

function jumpTo(index: number, item: any) {
  if (item.isMastered) {
    return;
  }
  hideContents();
  showQuestion();
  coursesStore.toSpecificStatement(index);
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

#contents.show {
  opacity: 1;
  height: 24.6rem;
}
</style>
