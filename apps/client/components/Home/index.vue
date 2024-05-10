<template>
  <div class="flex h-full w-full py-6 md:px-12">
    <div class="hidden min-w-56 md:block">
      <div class="md-4 flex flex-col md:mr-10">
        <div class="m-auto overflow-hidden rounded-full border border-solid border-gray-200 p-1">
          <img
            :src="userStore.userInfo?.picture!"
            class="h-40 w-40"
          />
        </div>
        <div class="mt-6 text-2xl">{{ userStore.userInfo?.username }}</div>
        <div class="text-sm text-gray-300">{{ userStore.userInfo?.name }}</div>
        <div
          v-if="false"
          class="border-t-solid border-t-black-200 mt-5 flex flex-col border-t pt-5"
        >
          <div class="text-2xl">勋章</div>
          <div class="mt-3 grid grid-cols-3 gap-2">
            <div
              class="m-auto overflow-hidden rounded-full"
              v-for="i in 13"
              :key="i"
            >
              <img
                src="https://sdfsdf.dev/72x72.png"
                alt=""
                class="h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex items-center">
        <div class="mr-auto text-2xl font-bold">最近使用的课程包</div>
        <NuxtLink
          href="/course-pack"
          class="btn btn-primary btn-sm mr-2"
          >更多课程包</NuxtLink
        >
        <!-- <NuxtLink
          class="btn btn-primary btn-sm"
          href="/course-pack"
          >更多音乐</NuxtLink
        > -->
      </div>
      <HomeRecentCoursePack class="mt-3 md:mt-5" />
      <hr class="border-black-200 my-3 border border-solid md:my-5" />
      <div class="border-black-200 w-full rounded-xl border border-solid p-4 shadow">
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
