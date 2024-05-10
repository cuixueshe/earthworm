<template>
  <div class="container m-auto flex w-full font-customFont">
    <div class="flex w-80 shrink-0 flex-col p-12 pt-0 text-4xl">
      <div class="avatar flex w-full justify-center p-0">
        <div class="w-full rounded-full">
          <img :src="userStore.userInfo?.picture!" />
        </div>
      </div>
      <div class="w-56">{{ userStore.userInfo?.username }}</div>
      <!-- 昵称 -->
      <!-- <div>{{ userStore.userInfo?.name }}</div> -->
      <!-- 勋章的展示 -->
      <!-- <div class="flex gap-2 py-4">
        <div
          class="overflow-hidden rounded-full"
          v-for="i of [1, 2, 3]"
          :key="i"
        >
          <img
            src="https://sdfsdf.dev/72x72.png"
            alt=""
          />
        </div>
      </div> -->
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex">
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

      <div class="mb-8 flex">
        <HomeRecentCoursePack />
        <!-- <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div> -->
      </div>
      <HomeCalendarGraph
        :data="learnRecord.list"
        :totalCount="learnRecord.totalCount"
        @toggleYear="toggleYear"
      />
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
