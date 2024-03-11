<template>
  <!-- <div>TODO</div>
  <div>for instance</div>
  <div>
    打卡模块
    <a href="https://github.com/cuixueshe/earthworm/issues/1">(from Issues #1)</a>
  </div> -->

  <CalendarGraph :data="data" @toggleYear="toggleYear" />
</template>

<script setup lang="ts">
import type { CalendarData } from "~/composables/user/calendarGraph";
import CalendarGraph from "./CalendarGraph.vue";
import { ref } from "vue";

const data = ref<CalendarData[]>([]);

async function toggleYear(year?: number) {
  const query = {
    startDate: year ? new Date(year).toISOString().slice(0, 10) : undefined,
    endDate: year ? new Date(year).toISOString().slice(0, 10) : undefined,
  }
  console.log(`( Home.vue: query )===============>`, query);
  // const res = await getList(query);
  setTimeout(() => {
    const res = [
      { date: '2024-01-17', count: 1 },
      { date: '2024-01-18', count: 3 },
      { date: '2024-01-19', count: 5 },
      { date: '2024-01-20', count: 10 },
      { date: '2024-01-21', count: 10 },
    ]
    data.value = res
  }, 3000)
}

</script>

<style lang="scss" scoped></style>
