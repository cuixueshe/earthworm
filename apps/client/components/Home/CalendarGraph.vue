<template>
  <div class="flex justify-between">
    <!-- 左侧打卡图 -->
    <div
      class="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-4 text-xs dark:border-gray-700"
    >
      <div class="w-full overflow-x-auto">
        <table class="mx-auto mb-2 overflow-hidden">
          <thead>
            <th></th>
            <th
              :colspan="colSpan"
              v-for="{ colSpan, month } in thead"
              :key="month"
              class="text-left font-normal"
            >
              {{ month }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in tbody"
              :key="weeksZh[i]"
            >
              <td class="relative hidden w-8 md:block">
                <span class="absolute">{{ i % 2 !== 0 ? weeksZh[i] : "" }}</span>
              </td>
              <td
                class="m-0"
                v-for="(cell, j) in row"
                :key="j"
              >
                <div
                  class="cell block"
                  :class="cell?.bg"
                  :data-tippy-content="cell?.tips"
                  @mouseenter="lazyTippy"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-2 flex justify-between px-1">
        <span class="justify-self-end text-sm dark:text-gray-400">
          一共学习了 <span class="font-semibold">{{ totalCount }}</span> 次</span
        >
        <div class="flex items-center gap-1 text-xs">
          <div class="text-gray-500">更少</div>
          <div class="cell"></div>
          <div class="cell low"></div>
          <div class="cell moderate"></div>
          <div class="cell high"></div>
          <div class="cell higher"></div>
          <div class="text-gray-500">更多</div>
        </div>
      </div>
    </div>

    <!-- 右侧年份选项 -->
    <!-- TODO: 多年份选择还没做，目前只有 2024，先写死了 -->
    <div
      class="btn btn-sm tw-btn-blue ml-6 hidden pr-7 xl:flex"
      v-for="year in yearOptions"
      :key="year.value"
    >
      {{ year.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";

import type { CalendarData, EmitsType } from "~/composables/user/calendarGraph";
import { useCalendarGraph } from "~/composables/user/calendarGraph";

const props = defineProps<{ data: CalendarData[]; totalCount: number }>();
const emits = defineEmits<EmitsType>();

const { initTable, renderBody, thead, tbody, weeksZh, yearOptions, lazyTippy } =
  useCalendarGraph(emits);

onMounted(() => {
  initTable();
});

watchEffect(() => {
  tbody.value = renderBody(props.data);
});
</script>

<style scoped>
.cell {
  @apply mt-[2px] h-[12px] w-[12px] rounded-sm bg-[#ebedf0] dark:bg-[#2d333b];
}

.low {
  @apply bg-[#9be9a8] dark:bg-[#0e4429];
}

.moderate {
  @apply bg-[#40c463] dark:bg-[#006d32];
}

.high {
  @apply bg-[#30a14e] dark:bg-[#26a641];
}

.higher {
  @apply bg-[#216e39] dark:bg-[#39d353];
}
</style>
