<template>
  <div class="flex justify-between">
    <!-- 左侧打卡图 -->
    <div
      class="min-w-0 flex-1 rounded-md border border-gray-300 px-2 py-4 text-xs dark:border-gray-700"
    >
      <div
        class="w-full overflow-x-auto"
        ref="tableContainer"
      >
        <table
          class="mx-auto mb-2"
          ref="calendarTable"
        >
          <thead>
            <th></th>
            <th
              v-for="{ colSpan, month } in thead"
              class="pb-1 text-left font-normal"
              :colspan="colSpan"
              :key="month"
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
                v-for="(cell, j) in row"
                :key="j"
              >
                <UTooltip :text="cell?.tips">
                  <div
                    class="cell block"
                    :class="[cell?.bg]"
                  ></div>
                </UTooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-2 flex justify-between px-1">
        <span class="justify-self-end text-sm dark:text-gray-400">
          {{ totalLearningTime > 0 ? "一共学习" : "还没有开始学习" }}
          <span
            v-if="totalLearningTime > 0"
            class="font-semibold text-purple-500"
            >{{ formatLearningTime(totalLearningTime) }}</span
          >
        </span>
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
      v-for="year in yearOptions"
      class="btn btn-sm tw-btn-blue ml-6 hidden pr-7 xl:flex"
      :key="year.value"
    >
      {{ year.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watchEffect } from "vue";

import type { CalendarDataItem, EmitsType } from "~/composables/user/calendarGraph";
import { useCalendarGraph } from "~/composables/user/calendarGraph";

enum ActivityLevel {
  Low = "low",
  Moderate = "moderate",
  High = "high",
  Higher = "higher",
}

const props = defineProps<{
  data: CalendarDataItem[];
  totalLearningTime: number;
}>();

const emits = defineEmits<EmitsType>();
const calendarTable = ref<HTMLTableElement>();
const tableContainer = ref<HTMLDivElement | null>(null);

const { initTable, renderBody, thead, tbody, weeksZh, yearOptions } = useCalendarGraph(emits, {
  getActivityLevel(item) {
    if (!item) return "";

    const duration = secondToMinutes(item.duration);
    if (duration < 10) return ActivityLevel.Low;
    if (duration < 30) return ActivityLevel.Moderate;
    if (duration < 60) return ActivityLevel.High;
    return ActivityLevel.Higher;
  },
  tipFormatter(current) {
    if (current.duration === 0) return `${current?.date} 没有学习`;

    let tip = "";
    const minutes = secondToMinutes(current.duration);
    if (minutes < 1) {
      tip = "不足 1 分钟";
    } else {
      tip = ` ${secondToMinutes(current.duration)} 分钟`;
    }
    return `${current.date} 学习${tip}`;
  },
});

function secondToMinutes(second: number) {
  return Math.floor(second / 60);
}

function formatLearningTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}小时${minutes}分钟`;
  } else {
    if (minutes === 0) {
      return `不足 1 分钟`;
    } else {
      return `${minutes}分钟`;
    }
  }
}

onMounted(() => {
  initTable();
  scrollAutoToRight();
});

function scrollAutoToRight() {
  nextTick(() => {
    if (tableContainer.value) {
      tableContainer.value.scrollLeft = tableContainer.value.scrollWidth;
    }
  });
}

watchEffect(() => {
  tbody.value = renderBody(props.data);
});
</script>

<style scoped>
.cell {
  @apply h-[12px] w-[12px] rounded-sm border-gray-200 bg-gray-200 hover:scale-125 hover:border hover:border-blue-400 dark:bg-gray-700 dark:hover:border-gray-50;
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
