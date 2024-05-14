<template>
  <div class="flex justify-between transition-all">
    <div v-if="!loadingAnimation">
      <table class="border-spacing-1/2 border-separate text-xs">
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
            :key="weeks[i]"
          >
            <td class="relative hidden w-8 md:block">
              <span class="absolute bottom-[-3px]">{{ i % 2 !== 0 ? weeks[i] : "" }}</span>
            </td>

            <td
              class="m-0"
              v-for="(cell, j) in row"
              :key="j"
            >
              <div
                class="cell tooltip block"
                :data-tip="cell?.tips"
                :class="cell?.bg"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between px-4 py-2">
        <span class="justify-self-end pl-2 text-sm dark:text-gray-400">
          一共学习了 {{ totalCount }} 次</span
        >
        <div class="flex items-center gap-1 text-xs">
          <div class="text-gray-500">Less</div>
          <div class="cell"></div>
          <div class="cell low"></div>
          <div class="cell moderate"></div>
          <div class="cell high"></div>
          <div class="cell higher"></div>
          <div class="text-gray-500">More</div>
        </div>
      </div>
    </div>

    <div
      class="h-40 w-[800px] rounded-lg bg-black/20 blur-sm"
      v-else
    />

    <div class="dropdown dropdown-bottom ml-3 flex w-[120px]">
      <div
        tabindex="0"
        class="h-fit w-full cursor-pointer rounded-md bg-[#1f6feb] p-2 text-sm text-white"
      >
        {{ year || yearOptions[0].label }}
      </div>
      <!-- TODO: 暂时只有 2024 年一年的数据 所以先不需要展开了 -->
      <!-- <ul
          tabindex="0"
          class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li
            v-for="item in yearOptions"
            :key="item.value"
            @click="initTable(item.value)"
          >
            <a>{{ item.label }}</a>
          </li>
        </ul> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from "vue";

import type { CalendarData, EmitsType } from "~/composables/user/calendarGraph";
import { useDarkMode } from "~/composables/darkMode";
import { useCalendarGraph } from "~/composables/user/calendarGraph";

const props = defineProps<{ data: CalendarData[]; totalCount: number }>();
const emits = defineEmits<EmitsType>();

const { loadingAnimation } = useDarkMode();

const { initTable, renderBody, weeks, thead, tbody, year, yearOptions } = useCalendarGraph(emits);

onMounted(() => {
  initTable();
});

watchEffect(() => {
  tbody.value = renderBody(props.data);
});
</script>

<style scoped>
.cell {
  @apply h-[11px] w-[11px] rounded-sm bg-[#ebedf0] dark:bg-[#2d333b];
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
