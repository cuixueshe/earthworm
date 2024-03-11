<template>
  <CalendarGraph :data="data" @toggleYear="toggleYear" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { format, type CalendarData } from "~/composables/user/calendarGraph";
import CalendarGraph from "./CalendarGraph.vue";

const data = ref<CalendarData[]>([]);

async function toggleYear(year?: number) {
  const query = {
    startDate: year ? format(new Date(year)) : undefined,
    endDate: year ? format(new Date(year)) : undefined,
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
