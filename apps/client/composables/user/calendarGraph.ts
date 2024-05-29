import dayjs from "dayjs";
import { ref } from "vue";

import { Theme } from "~/composables/darkMode";

enum CalendarLevel {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  DIE = 4, // 😂
}

export enum Locale {
  ZH_CN = "zh-CN",
  EN_US = "en-US",
}

export interface CalendarBlock {
  date: string;
  count: number;
  tip?: string;
  bgColor?: string;
}

export interface CalendarData {
  day: string;
  count: number;
}

interface Other {
  less: string;
  more: string;
  summaryFn: (count: number) => string;
}

interface CalendarOptions {
  data: CalendarData[];
  year?: number;
  locale?: Locale;
  theme?: Theme;
  beginDay?: "sunday" | "monday";
  separate?: boolean | "odd" | "even";
  formatFn?: (date: string, count: number) => string;
}

class CalendarGraph {
  // 可用的图例颜色
  static readonly LEGENDS: Record<Theme, string[]> = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  // 星期的语言配置
  static readonly WEEKS: Record<Locale, string[]> = {
    "zh-CN": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    "en-US": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };

  // 月份的语言配置
  static readonly MONTHS: Record<Locale, string[]> = {
    "zh-CN": [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    "en-US": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };

  // 提示的语言配置
  static readonly TOOLTIPS = {
    "zh-CN": (date: string, count: number) => {
      const pre = count > 0 ? `${count} 次学习` : "没有学习";
      return `${pre}, ${date}`;
    },
    "en-US": (date: string, count: number) => {
      const pre = count > 0 ? `${count} times` : "No learning";
      const month = this.MONTHS["en-US"][dayjs(date).month()];
      return `${pre}, ${month} ${this._getOrdinalSuffix(date)}.`;
    },
  };

  // 其他标注的语言配置
  static readonly OTHERS = {
    "zh-CN": {
      less: "更少",
      more: "更多",
      summaryFn: (count: number) => `一共学习了 ${count} 次`,
    },
    "en-US": {
      less: "Less",
      more: "More",
      summaryFn: (count: number) => `Total ${count} times`,
    },
  };

  private _data: CalendarData[] = [];
  private _year: number;
  private _locale: Locale;
  private _theme: Theme;
  private tooltipFn: Function;
  private _beginDay: string;
  private _separate: boolean | "odd" | "even";

  constructor(options: CalendarOptions) {
    this._data = options.data;
    this._locale = options.locale || Locale.ZH_CN;
    this._theme = options.theme || Theme.LIGHT;
    this._year = options.year || dayjs().year();
    this.tooltipFn = options.formatFn || CalendarGraph.TOOLTIPS[Locale.ZH_CN];
    this._beginDay = options.beginDay || "sunday";
    this._separate = options.separate || false;
  }

  /**
   * @description 辅助函数
   * 获取英文日期的序数后缀，用于提示
   * @param date 日期
   * @returns 序数后缀 1st, 2nd, 3rd, 4th
   */
  static _getOrdinalSuffix(date: number | Date | string) {
    const day = dayjs(date).date();
    const suffix = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
  }

  /**
   * @description 辅助函数
   * 根据学习数量获取level
   * @param count 数量
   * @returns level
   */
  private _getLevel(count: number) {
    if (count === 0) {
      return CalendarLevel.NONE;
    } else if (count <= 3) {
      return CalendarLevel.LOW;
    } else if (count <= 5) {
      return CalendarLevel.MEDIUM;
    } else if (count <= 10) {
      return CalendarLevel.HIGH;
    } else {
      return CalendarLevel.DIE;
    }
  }

  /**
   * @description 辅助函数
   * 获取level对应的颜色
   * @param count 数量
   * @returns 颜色
   */
  private _getLevelColor(count: number) {
    const level = this._getLevel(count);
    return CalendarGraph.LEGENDS[this._theme][level];
  }

  /**
   * @description 辅助函数
   * 获取日历的日期范围
   * @returns 日期范围 [startDate, endDate]
   */
  private _getDateRange() {
    // 如果有年份，返回当年的第一天和最后一天
    if (this._year !== dayjs().year()) {
      return [dayjs(`${this._year}-01-01`), dayjs(`${this._year}-12-31`)];
    }

    // 最后一天是今天，往前推一年
    const endDate = dayjs();
    const startDate = endDate.subtract(1, "year");

    return [startDate, endDate];
  }

  /**
   * 获取星期的标签
   * @param separate 是否分隔
   * @param odd 只显示奇数星期
   * @returns 星期标签
   */
  getWeeksLabels() {
    let week = [...CalendarGraph.WEEKS[this._locale], ...CalendarGraph.WEEKS[this._locale]];

    let result = week;
    switch (this._separate) {
      case "odd":
      case true:
        result = week.map((v, i) => (i % 2 === 1 ? v : ""));
        break;

      case "even":
        result = week.map((v, i) => (i % 2 === 0 ? v : ""));
        break;
    }

    if (this._beginDay === "monday") {
      return result.slice(1, 8);
    }

    return result.slice(0, 7);
  }

  /**
   * 获取月份的标签, 默认返回12个月的标签
   * @returns 月份标签
   */
  getMonthsLabels() {
    const month = [...CalendarGraph.MONTHS[this._locale], ...CalendarGraph.MONTHS[this._locale]];
    const [startDate] = this._getDateRange();
    const startMonth = startDate.month();
    const count = this._year === dayjs().year() ? 13 : 12;
    return month.slice(startMonth, startMonth + count);
  }

  /**
   * 获取图例
   * @returns 图例颜色数组
   */
  getLegends() {
    return CalendarGraph.LEGENDS[this._theme];
  }

  /**
   * 获取提示
   * @returns 提示数据对象
   */
  getOthers() {
    return CalendarGraph.OTHERS[this._locale];
  }

  /**
   * 重新设置属性
   * @param options 选项
   */
  setOptions(options: CalendarOptions) {
    this._data = options.data || this._data;
    this._locale = options.locale || this._locale;
    this._theme = options.theme || this._theme;
    this._year = options.year || this._year;
    this.tooltipFn = options.formatFn || CalendarGraph.TOOLTIPS[options.locale || Locale.ZH_CN];
    this._beginDay = options.beginDay || this._beginDay;
    this._separate = options.separate || this._separate;
  }

  /**
   * 生成日历数据
   * @returns 日历数据
   */
  generateCalendarData() {
    const result: CalendarBlock[] = [];
    const [startDate, endDate] = this._getDateRange();

    // 如果开始日期不是我规定的一周的第一天，那么需要补充前面的日期
    const day = startDate.day();
    let diff = day;
    if (this._beginDay === "monday" && day !== 1) {
      diff = day === 0 ? 6 : day - 1;
    }

    const newStartDate = startDate.subtract(diff, "day");
    const total = endDate.diff(startDate, "day") + 1 + diff;

    for (let i = 0; i < total; i++) {
      const date = newStartDate.add(i, "day").format("YYYY-MM-DD");
      const count = this._data.find((v) => v.day === date)?.count || 0;
      const tip = this.tooltipFn(date, count);
      const bgColor = this._getLevelColor(count);

      result.push({ date, count, tip, bgColor });
    }

    return result;
  }
}

export function useCalendarGraph() {
  const calendarGraph = new CalendarGraph({ data: [] });

  const renderData = ref<CalendarBlock[]>([]);
  const renderWeekLabels = ref<string[]>([]);
  const renderMonthLabels = ref<{ label: string; offset: number }[]>([]);
  const renderLegends = ref<string[]>([]);
  const renderTips = ref<Other>();

  const _calcHeaderOffset = (labels: string[]) => {
    // 需要计算每个月1号所在的列
    const offsets: number[] = [];
    renderData.value.map((item, index) => {
      if (item.date.endsWith("-01")) {
        const offset = Math.floor(index / 7);
        offsets.push(offset);
      }
    });

    // 总列数
    const total = Math.ceil(renderData.value.length / 7);

    const result = [];
    // 月份标签从后往前添加 offset
    for (let i = total - 1; i >= 0; i--) {
      const index = offsets.indexOf(i);
      result.push({
        label: index !== -1 ? labels.pop() || "" : "",
        offset: i,
      });
    }

    return result.reverse();
  };

  const reRender = (options: CalendarOptions) => {
    calendarGraph.setOptions(options);

    const monthsLabels = calendarGraph.getMonthsLabels();
    renderData.value = calendarGraph.generateCalendarData();
    renderWeekLabels.value = calendarGraph.getWeeksLabels();
    renderMonthLabels.value = _calcHeaderOffset(monthsLabels);
    renderLegends.value = calendarGraph.getLegends();
    renderTips.value = calendarGraph.getOthers();
  };

  return {
    reRender,
    renderData,
    renderWeekLabels,
    renderMonthLabels,
    renderLegends,
    renderTips,
  };
}
