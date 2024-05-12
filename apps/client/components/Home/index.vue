<template>
  <div class="flex h-full w-full py-6">
    <div class="mr-10 hidden max-w-[230px] md:block">
      <div class="md-4 flex flex-col md:mr-10">
        <div
          class="h-[230px] w-[230px] overflow-hidden rounded-full border border-gray-200 p-[2px] dark:border-gray-600"
        >
          <img
            :src="userStore.userInfo?.picture!"
            class="h-full w-full cursor-pointer"
          />
        </div>
        <div class="mt-6 text-2xl font-bold">{{ userStore.userInfo?.username }}</div>
        <div class="text-xl font-light text-gray-400">
          {{ userStore.userInfo?.name }}
        </div>
        <!-- TODO: 等勋章功能上线后，再显示此区域-->
        <!-- <div
          class="border-t-solid border-t-black-200 mt-5 flex flex-col border-t border-gray-300 pt-5 dark:border-gray-700"
        >
          <div class="text-md">勋章</div>
          <div class="mt-3 grid grid-cols-3 gap-2">
            <div
              class="m-auto flex-shrink-0 overflow-hidden rounded-full"
              v-for="i in 12"
              :key="i"
            >
              <img
                src="https://sdfsdf.dev/72x72.png"
                alt=""
                class="flex-shrink-0"
              />
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div
      class="flex flex-1 flex-col justify-between rounded-md border border-gray-300 p-5 dark:border-gray-700"
    >
      <div class="top">
        <div class="flex items-center">
          <div class="mr-auto text-2xl font-bold">最近使用的课程包</div>
          <NuxtLink
            href="/course-pack"
            class="btn btn-primary btn-sm mr-2 border-none bg-[#1f6feb] text-white hover:bg-[#1f6feb]"
            >更多课程包</NuxtLink
          >
          <!-- <NuxtLink
          class="btn btn-primary btn-sm"
          href="/course-pack"
          >更多音乐</NuxtLink
        > -->
        </div>
        <HomeRecentCoursePack class="mt-3 md:mt-5" />
      </div>
      <hr class="my-3 border-gray-300 dark:border-gray-700 md:my-5" />
      <div class="w-full rounded-xl">
        <HomeCalendarGraph
          :data="learnRecord.list"
          :totalCount="learnRecord.totalCount"
          @toggleYear="toggleYear"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useLearnRecord } from "~/composables/learnRecord";
import { type CalendarData } from "~/composables/user/calendarGraph";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { learnRecord, setupLearnRecord, setQueryYear } = useLearnRecord();
const { toggleYear } = useCalendarGraph();

function useCalendarGraph() {
  const data = ref<CalendarData[]>([]);
  const totalCount = ref<number>(0);

  async function toggleYear(year?: number) {
    setQueryYear(year);
    setupLearnRecord();
  }

  return {
    data,
    totalCount,
    toggleYear,
  };
}
</script>

<style scoped></style>
