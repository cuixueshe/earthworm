import { defineStore } from "pinia";
import { ref } from "vue";
import * as Echarts from "echarts";

export const LOCAL_STORAGE_KEY = "calendarInfo";
export const LOCAL_CALENDAR_KEY_INDEX = "dayForIndexMap";

type dayForIndexMapType = {
  [key: string]: any;
};

// [[day: index]]
let dayForIndexMap: dayForIndexMapType = {};

// 获取某一年的日历数据
function getCalendarDataByYear(year: String) {
  const date = +Echarts.time.parse(year + "-01-01");
  const end = +Echarts.time.parse(+year + 1 + "-01-01");
  const dayTime = 3600 * 24 * 1000;
  const data = [];
  for (let time = date, index = 0; time < end; time += dayTime, index++) {
    const day = Echarts.time.format(time, "{yyyy}-{MM}-{dd}", false);
    dayForIndexMap[day] = index;
    data.push([day, 0]);
  }
  return data;
}

type Calendar = Array<[string, number]>;

export const useCalendarStore = defineStore("calendar", () => {
  const calendar = ref<Calendar>();

  // 初始化
  function initCalendar() {
    calendar.value = getCalendarInfo() || getCalendarDataByYear("2024");
    saveCalendarInfo();
    saveCalendarKey();
  }

  // 更新
  function updateCalendarInfo(time: string) {
    dayForIndexMap = getCalendarKeyInfo();
    restoreCalendar();
    const index = dayForIndexMap[time];
    if (calendar.value && calendar.value[index]) {
      calendar.value[index] = [
        calendar.value[index][0],
        Number(calendar.value[index][1]) + 5,
      ];
      saveCalendarInfo();
    }
  }

  // 登出清空
  function logoutCalendar() {
    calendar.value = undefined;
    removeCalendarInfo();
  }

  // 设置日历数据
  function saveCalendarInfo() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(calendar.value));
  }

  // 设置 {day: index}
  function saveCalendarKey() {
    localStorage.setItem(
      LOCAL_CALENDAR_KEY_INDEX,
      JSON.stringify(dayForIndexMap)
    );
  }

  // 清除日历缓存
  function removeCalendarInfo() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  // 获取日历数据
  function getCalendarInfo() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  // 获取 {day: index}
  function getCalendarKeyInfo() {
    const data = localStorage.getItem(LOCAL_CALENDAR_KEY_INDEX);
    return data ? JSON.parse(data) : null;
  }

  // 重新赋值 calendar
  function restoreCalendar() {
    const userInfoStringify = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (userInfoStringify) calendar.value = JSON.parse(userInfoStringify);
  }

  return {
    calendar,
    initCalendar,
    logoutCalendar,
    restoreCalendar,
    getCalendarInfo,
    updateCalendarInfo,
  };
});
