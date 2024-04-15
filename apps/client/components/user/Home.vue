<template>
  <!-- <div>TODO</div>
  <div>for instance</div>
  <div>
    打卡模块
    <a href="https://github.com/cuixueshe/earthworm/issues/1"
      >(from Issues #1)</a
    >
  </div> -->
  <div>打卡模块</div>
  <div
    class="w-full main h-96"
    id="main"
  ></div>
</template>

<script setup lang="ts">
import * as Echarts from "echarts";
import { onMounted } from "vue";
import { LOCAL_STORAGE_KEY, useCalendarStore } from "~/store/calendar";

interface calendarOptions {
  title: {
    top?: number;
    left?: string;
    text: string;
  };
  tooltip: {};
  visualMap: {};
  calendar: {};
  series: {};
}

let calendarChart = null;
let calendarOpts: calendarOptions = {} as calendarOptions;

// 初始化日历选项
function initChartOpts() {
  const calendarStore = useCalendarStore();
  const { getCalendarInfo, initCalendar } = calendarStore;
  if (!getCalendarInfo()) initCalendar();
  calendarOpts = {
    title: {
      top: 30,
      left: "center",
      text: "Earthworm Calendar",
    },
    visualMap: {
      min: 0,
      max: 20,
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 65,
      color: [
        "rgb(33, 110, 57)",
        "rgb(48, 161, 78)",
        "rgb(64, 196, 99)",
        "rgb(155, 233, 168)",
        "rgb(235, 237, 240)",
      ],
    },
    tooltip: {
      show: true,
      position: "top",
      backgroundColor: "#000",
      borderColor: "transparent",
      textStyle: {
        color: "#fff",
      },
      formatter: function (params: {
        value: [string, number];
        [key: string]: any;
      }) {
        const { value } = params;
        return `${value[1]} completed on ${value[0]}`;
      },
    },
    calendar: {
      top: 120,
      left: 60,
      right: 30,
      cellSize: [12, 17],
      border: "transparent",
      range: "2024",
      itemStyle: {
        borderWidth: 5,
        borderColor: "transparent",
        borderCap: "square",
        color: "#fff",
      },
      splitLine: {
        show: false,
      },
      monthLabel: {
        show: true,
        color: "#000",
        formatter: function (param: { MM: String }) {
          const obj = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec",
          };
          return obj[param.MM];
        },
      },
      // dayLabel: { show: true, nameMap: ["Mon", "", "Wed", "", "Fri", "", ""] },
      dayLabel: { show: true, nameMap: ["M", "", "W", "", "F", "", ""] },
      yearLabel: { show: true, margin: "38" },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: Array.from(getCalendarInfo()),
    },
  };
}
function initCalendar() {
  initChartOpts();
  const calendarDom = document.getElementById("main");
  calendarChart = Echarts.init(calendarDom);
  calendarChart.setOption(calendarOpts);
}

window.addEventListener("storage", (e) => {
  if (e.key === LOCAL_STORAGE_KEY) {
    if (calendarChart) {
      initChartOpts();
      calendarChart.setOption(calendarOpts);
    } else {
      initCalendar();
    }
  }
});

onMounted(() => {
  initCalendar();
});
</script>

<style lang="scss" scoped></style>
