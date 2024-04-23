<template>
  <div class="container m-auto w-full font-customFont">
    个人主页
    <h2>{{ userStore.userInfo?.name }}</h2>

    <CalendarGraph
      :data="data"
      :totalCount="totalCount"
      @toggleYear="toggleYear"
    />
    <div>
      <div>
        <NuxtLink href="/course-pack">更多课程包</NuxtLink>
      </div>
      <HomeRecentCoursePack />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { fetchLearnRecord } from "~/api/userLearnRecord";
import { type CalendarData } from "~/composables/user/calendarGraph";
import { useUserStore } from "~/store/user";
import CalendarGraph from "./CalendarGraph.vue";

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
