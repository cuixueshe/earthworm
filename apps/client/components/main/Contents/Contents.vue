<template>
  <div
    id="contents"
    class="absolute top-24 left-0 w-56 z-10 border-l-4 border-fuchsia-500 overflow-y-scroll pl-2 select-none"
    :class="[isShow() && 'show']"
  >
    <div
      class="mb-2"
      v-for="(item, index) in contentsList"
      :key="item.id"
      :class="getItemClassNames(index)"
      @click="jumpTo(index)"
    >
      {{ `${index + 1} - ${item.chinese}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCourseStore } from "~/store/course";
import { useContent } from "./useContents";

const { isShow } = useContent();

const coursesStore = useCourseStore();

const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

function getItemClassNames(index: number) {
  const classNames: string[] = [];
  if (isActive(index)) {
    classNames.push("text-fuchsia-500");
  }

  if (haveEverLearned(index)) {
    classNames.push("hover:text-fuchsia-500 cursor-pointer");
  } else {
    classNames.push("text-slate-600 cursor-not-allowed");
  }

  return classNames;
}

/**
 * 判断是否为当前小节
 * @param index
 */
function isActive(index: number) {
  return coursesStore.statementIndex === index;
}

/**
 * 判断该小节是否未练习过
 * @param index
 */
function haveEverLearned(index: number) {
  return (
    coursesStore.currentCourse?.count || index <= coursesStore.statementIndex
  );
}

function jumpTo(index: number) {
  if (haveEverLearned(index)) {
    coursesStore.toSpecificStatement(index);
  }
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
  height: 24rem;
}
</style>
