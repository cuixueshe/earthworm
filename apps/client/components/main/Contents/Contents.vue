<template>
  <div
    id="contents"
    class="absolute top-24 left-0 w-56 z-10 border-l-4 border-fuchsia-500 pl-2 select-none"
    :class="[isShowContents() && 'show']"
    v-bind="containerProps"
  >
    <div v-bind="wrapperProps">
      <div
        v-for="item in list"
        class="mb-2"
        :key="item.data.id"
        :class="getItemClassNames(item.index)"
        @click="jumpTo(item.index)"
      >
        <div class="flex">
          <span>{{ item.index + 1 }}</span>
          <span>&nbsp-&nbsp</span>
          <span class="flex-1">{{ item.data.chinese }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { fetchCourseHistory } from "~/api/courseHistory";
import { useCourseStore } from "~/store/course";
import { useContent } from "./useContents";

const { isShowContents, watchIsContentsItself } = useContent();

const coursesStore = useCourseStore();

const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  contentsList.value,
  { itemHeight: 30 }
);

const props = defineProps<{
  /**
   * 不允许跳过未学题目
   */
  notAllowedSkip?: Boolean;
}>();

function getItemClassNames(index: number) {
  const classNames: string[] = [];
  if (isActive(index)) {
    classNames.push("text-fuchsia-500");
  }

  if (!props.notAllowedSkip || haveEverLearned(index)) {
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
  return completionCount || index <= coursesStore.latestLearnedIndex;
}

function jumpTo(index: number) {
  if (!props.notAllowedSkip || haveEverLearned(index)) {
    coursesStore.toSpecificStatement(index);
  }
}

/**
 * 课程完成次数
 */
let completionCount = 0;

/**
 * 获取课程完成次数
 */
async function getCompletionCont() {
  if (props.notAllowedSkip) return 0;
  const res = await fetchCourseHistory();
  const courseHistory = res.find(
    (item) => item.courseId === coursesStore.currentCourse?.id
  );
  return (courseHistory && courseHistory.completionCount) || 0;
}

onMounted(async () => {
  scrollTo(coursesStore.statementIndex);
  watchIsContentsItself(containerProps.ref.value!);
  completionCount = await getCompletionCont();
});
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
  height: 24rem;
}
</style>
