<template>
  <div class="mt-8 flex w-full justify-between overflow-hidden">
    <!-- 左侧头像区域 -->
    <div class="mr-16 hidden w-72 md:block">
      <div class="mx-auto h-56 w-56 overflow-hidden">
        <img
          class="h-full w-full rounded-full border-2 border-gray-300 bg-gray-200 dark:border-gray-700"
          :src="userStore.userInfo?.picture!"
        />
      </div>
      <div class="mt-4 truncate">
        <div class="text-3xl font-medium">{{ userStore.userInfo?.username }}</div>
        <div class="text-md text-gray-400">
          {{ userStore.userInfo?.name || "未设置" }}
        </div>
      </div>
      <hr class="my-5 dark:border-gray-700" />
      <!-- TODO: 等后续勋章制作完成再放出来 -->
      <!-- <div class="text-lg font-medium">勋章</div>
      <div class="mt-2 grid grid-cols-4 gap-2">
        <div
          v-for="i in 6"
          class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"
        ></div>
      </div> -->
    </div>

    <!-- 右侧课程包区域 -->
    <div class="flex flex-1 flex-col justify-between">
      <div class="mb-4 flex flex-col justify-between">
        <div class="header mb-4 flex items-center justify-between">
          <div class="text-xl font-medium">最近使用的课程包</div>
          <NuxtLink
            href="/course-pack"
            class="link text-blue-500 no-underline hover:opacity-75"
            >更多课程包
          </NuxtLink>
        </div>

        <HomeRecentCoursePack />
      </div>

      <div class="mb-6">
        <hr class="my-5 dark:border-gray-700" />
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
