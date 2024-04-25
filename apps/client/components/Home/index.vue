<template>
  <div class="container m-auto flex w-full font-customFont">
    <div class="flex w-80 shrink-0 flex-col p-12 text-4xl">
      <div class="avatar flex w-full justify-center p-0">
        <div class="w-full rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div class="w-56">@{{ userStore.userInfo?.username }}</div>
      <!-- <div>{{ userStore.userInfo?.name }}</div> -->
      <div class="flex gap-2 py-4">
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
      </div>
    </div>
    <div class="flex flex-1 flex-col">
      <div class="flex">
        <NuxtLink
          href="/course-pack"
          class="btn btn-primary btn-sm mr-2"
          >更多课程包</NuxtLink
        >
        <NuxtLink
          class="btn btn-primary btn-sm"
          href="/course-pack"
          >更多音乐</NuxtLink
        >
      </div>
      <div class="mb-8 flex">
        <HomeRecentCoursePack />
        <!-- <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div> -->
      </div>
      <HomeCalendarGraph
        :data="data"
        :totalCount="totalCount"
        @toggleYear="toggleYear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { fetchLearnRecord } from "~/api/userLearnRecord";
import { type CalendarData } from "~/composables/user/calendarGraph";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { data, totalCount, toggleYear } = useCalendarGraph();

function useCalendarGraph() {
  const data = ref<CalendarData[]>([]);
  const totalCount = ref<number>(0);

  async function toggleYear(year?: number) {
    const query = {
      startDate: year ? `${year}-01-01` : undefined,
      endDate: year ? `${year}-12-31` : undefined,
    };
    const res = await fetchLearnRecord(query);
    totalCount.value = res.totalCount;
    data.value = res.list;
  }

  return {
    data,
    totalCount,
    toggleYear,
  };
}
</script>

<style scoped></style>
