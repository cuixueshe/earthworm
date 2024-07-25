<template>
  <div class="flex">
    <!-- 左侧打卡图 -->
    <div
      class="flex min-h-40 flex-1 flex-col overflow-hidden rounded-lg border border-gray-300 p-4 dark:border-gray-700"
    >
      <div
        v-if="renderData.length"
        class="mx-auto w-fit max-w-full text-xs"
      >
        <div class="flex justify-center overflow-x-auto pr-1">
          <!-- 星期标签 -->
          <div
            class="hidden shrink-0 flex-col md:flex"
            :style="{
              gap: `${cellMargin}px`,
              marginTop: `${cellSize + graphMargin}px`,
              marginRight: `${graphMargin}px`,
            }"
          >
            <span
              v-for="item in renderWeekLabels"
              :style="{
                height: `${cellSize}px`,
                lineHeight: `${cellSize}px`,
              }"
              >{{ item }}</span
            >
          </div>

          <div class="flex flex-col">
            <!-- 月份标签 -->
            <div
              class="flex items-center"
              :style="{
                marginBottom: `${graphMargin}px`,
                gap: `${cellMargin}px`,
              }"
            >
              <span
                v-for="item in renderMonthLabels"
                class="whitespace-nowrap"
                :style="{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  lineHeight: `${cellSize}px`,
                }"
                >{{ item.label }}</span
              >
            </div>
            <!-- 打卡图表 -->
            <div
              ref="calendarTable"
              class="flex flex-col flex-wrap"
              :style="{
                height: `${graphHeight}px`,
                gap: `${cellMargin}px`,
              }"
            >
              <div
                class="cell"
                :style="{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: item.bgColor,
                }"
                v-for="item in renderData"
                :key="item.date"
                :data-tippy-content="item.tip"
                @mouseenter="(e) => $calendarTippy(e, calendarTable)"
              />
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between"
          :style="{
            marginTop: `${graphMargin}px`,
          }"
        >
          <span class="text-sm dark:text-gray-400">
            {{ renderTips?.summaryFn(totalCount) }}
          </span>
          <div class="flex items-center gap-1">
            <div class="text-gray-500">{{ renderTips?.less }}</div>
            <div
              class="cell h-2.5 w-2.5"
              v-for="item in renderLegends"
              :style="{ backgroundColor: item }"
            ></div>
            <div class="text-gray-500">{{ renderTips?.more }}</div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="loading loading-dots loading-md m-auto"
      ></div>
    </div>

    <!-- 右侧年份选择 -->
    <div class="ml-6 hidden flex-col gap-2 md:flex">
      <div
        v-for="item in yearOptions"
        class="btn btn-sm"
        :class="{
          'tw-btn-blue': item === currentYear,
        }"
        :key="item"
        @click="getUserRecord(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";

import type { CalendarData } from "~/composables/user/calendarGraph";
import { useDarkMode } from "~/composables/darkMode";
import { Locale, useCalendarGraph } from "~/composables/user/calendarGraph";

const props = defineProps<{
  data: CalendarData[];
  totalCount: number;
  yearOptions: number[];
}>();

const emits = defineEmits<{
  (event: "toggleYear", year?: number): void;
}>();

const { darkMode } = useDarkMode();
const { renderData, reRender, renderMonthLabels, renderLegends, renderWeekLabels, renderTips } =
  useCalendarGraph();

const MIN_GRAPH_MARGIN = 12;

const calendarTable = ref<HTMLTableElement>();
const currentYear = ref(dayjs().year());
// 单个格子的大小和间距
const cellSize = ref(12);
const cellMargin = ref(2);

// 7.25 个格子 + 7 个间距块
const graphHeight = computed(() => cellSize.value * 7.25 + cellMargin.value * 7);
const graphMargin = computed(() => Math.min(MIN_GRAPH_MARGIN, cellSize.value / 2));

function getUserRecord(year = dayjs().year()) {
  // renderData.value = [];
  currentYear.value = year;
  emits("toggleYear", year);
}

// 以下状态更新时重新渲染打卡图
watch(
  [() => props.data, darkMode],
  ([data, theme]) => {
    getUserRecord(currentYear.value);
    // 自定义配置属性
    reRender({
      data,
      theme,
      locale: Locale.ZH_CN,
      beginDay: "sunday",
      separate: "odd",
      year: currentYear.value,
      // formatFn: (date) => date,
    });
  },
  { immediate: true },
);
</script>

<style scoped>
.cell {
  @apply rounded-sm border-gray-200 hover:scale-125 hover:border hover:border-blue-400 dark:hover:border-gray-50;
}
</style>
