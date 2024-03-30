<template>
  <div
    id="contents"
    class="absolute top-24 left-0 w-80 z-10 border-l-4 border-fuchsia-500 pl-2 select-none bg-white dark:bg-slate-800 shadow p-2"
    :class="[isShowContents() && 'show']"
    v-bind="containerProps"
  >
    <div v-bind="wrapperProps">
      <div
        v-for="item in list"
        class="mb-2 group"
        :key="item.data.id"
        :class="getItemClassNames(item.index)"
        @click="jumpTo(item.index)"
      >
        <div
          class="tooltip flex-start"
          :data-tip="item.data.chinese"
        >
          <span>{{ item.index + 1 }}</span>
          <span>&nbsp-&nbsp</span>
          <span
            class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis"
            >{{ item.data.chinese }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from "@vueuse/core";
import { computed, onMounted } from "vue";
import { useCourseStore } from "~/store/course";
import { useContent } from "./useContents";

const { isShowContents, watchClickOutside, closeContents } = useContent();

const coursesStore = useCourseStore();

const contentsList = computed(() => {
  return coursesStore.currentCourse?.statements || [];
});

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
  contentsList.value,
  { itemHeight: 30 }
);

function getItemClassNames(index: number) {
  const classNames: string[] = [];
  if (isActive(index)) {
    classNames.push("text-fuchsia-500");
  }
  classNames.push("hover:text-fuchsia-500 cursor-pointer");
  return classNames;
}

function isActive(index: number) {
  return coursesStore.statementIndex === index;
}

function jumpTo(index: number) {
  coursesStore.toSpecificStatement(index);
  closeContents();
}

onMounted(async () => {
  scrollTo(coursesStore.statementIndex);
  watchClickOutside(containerProps.ref.value!);
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
