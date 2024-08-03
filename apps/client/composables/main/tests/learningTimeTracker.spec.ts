import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import { updateDailyLearningDailyTotalTime } from "~/api/user-learning-activity";
import { useLearningTimeTracker } from "../learningTimeTracker";

vi.mock("~/store/user", () => ({
  useUserStore: vi.fn(() => ({
    user: { id: "testUser" },
  })),
}));

vi.mock("~/api/user-learning-activity", () => ({
  updateDailyLearningDailyTotalTime: vi.fn(),
}));

describe("useLearningTimeTracker", () => {
  let tracker: ReturnType<typeof useLearningTimeTracker>;

  beforeEach(() => {
    tracker = useLearningTimeTracker();
    // 清除 localStorage
    localStorage.clear();
    // 重置计时器
    vi.useFakeTimers();
    // 重置
    tracker.totalSeconds.value = 0;
    tracker.isTracking.value = false;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    tracker.stopTracking();
  });

  it("should initialize with zero seconds and not tracking", () => {
    expect(tracker.totalSeconds.value).toBe(0);
    expect(tracker.isTracking.value).toBe(false);
  });

  it("should start tracking when startTracking is called", () => {
    tracker.startTracking();
    expect(tracker.isTracking.value).toBe(true);
  });

  it("should stop tracking when stopTracking is called", () => {
    tracker.startTracking();
    tracker.stopTracking();
    expect(tracker.isTracking.value).toBe(false);
  });

  it("should increment totalSeconds every second when tracking", async () => {
    tracker.startTracking();
    vi.advanceTimersByTime(3000);
    await nextTick();
    expect(tracker.totalSeconds.value).toBe(3);
  });

  it("should save time to localStorage every 30 seconds", () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    tracker.startTracking();
    vi.advanceTimersByTime(30000);
    expect(setItemSpy).toHaveBeenCalledWith(expect.any(String), "30");
  });

  it("should load time from localStorage when starting tracking", () => {
    const date = new Date().toISOString().split("T")[0];
    localStorage.setItem(`learningTime_testUser_${date}`, "50");
    tracker.startTracking();
    expect(tracker.totalSeconds.value).toBe(50);
  });

  it("should not start tracking if already tracking", () => {
    tracker.startTracking();
    const initialSeconds = tracker.totalSeconds.value;
    tracker.startTracking(); // 尝试再次启动
    vi.advanceTimersByTime(1000);
    expect(tracker.totalSeconds.value).toBe(initialSeconds + 1); // 只增加了1秒
  });

  it("should upload time when stopping tracking", () => {
    tracker.startTracking();
    vi.advanceTimersByTime(5000);
    tracker.stopTracking();
    expect(updateDailyLearningDailyTotalTime).toHaveBeenCalledWith({
      date: expect.any(String),
      duration: 5,
    });
  });

  it("should reset totalSeconds to zero when a new day starts", async () => {
    // 模拟当前日期
    const day1 = new Date("2023-07-23T12:00:00");
    vi.setSystemTime(day1);

    // 开始跟踪并设置一些初始时间
    tracker.startTracking();
    vi.advanceTimersByTime(5000); // 5 seconds
    tracker.stopTracking();
    expect(tracker.totalSeconds.value).toBe(5);

    // 保存当前的存储键和值
    const day1StorageKey = `learningTime_testUser_2023-07-23`;
    const day1StoredValue = localStorage.getItem(day1StorageKey);

    // 模拟时间跨越到下一天
    const day2 = new Date("2023-07-24T12:00:00");
    vi.setSystemTime(day2);

    // 再次开始跟踪
    tracker.startTracking();

    // 检查 totalSeconds 是否重置为 0
    expect(tracker.totalSeconds.value).toBe(0);

    // 检查前一天的存储值是否保持不变
    expect(localStorage.getItem(day1StorageKey)).toBe(day1StoredValue);

    // 检查新的一天是否创建了新的存储项
    const day2StorageKey = `learningTime_testUser_2023-07-24`;
    expect(localStorage.getItem(day2StorageKey)).toBe("0");

    // 添加一些时间后再次检查
    vi.advanceTimersByTime(3000); // 3 seconds
    tracker.stopTracking();
    expect(tracker.totalSeconds.value).toBe(3);
    expect(localStorage.getItem(day2StorageKey)).toBe("3");
  });
});
