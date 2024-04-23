<template>
  <CalendarGraph
    :data="data"
    :totalCount="totalCount"
    @toggleYear="toggleYear"
  />
  <button
    class="btn"
    @click="handleToMusicMode"
  >
    音乐模式
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { fetchLearnRecord } from "~/api/userLearnRecord";
import { type CalendarData } from "~/composables/user/calendarGraph";
import CalendarGraph from "./CalendarGraph.vue";

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

const { handleToMusicMode } = useMusicMode();

function useMusicMode() {
  const router = useRouter();
  function handleToMusicMode() {
    router.push(`/music/courses`);
  }

  return {
    handleToMusicMode,
  };
}
</script>
