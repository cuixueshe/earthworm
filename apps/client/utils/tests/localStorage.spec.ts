import { beforeEach, describe, expect, it } from "vitest";

import { useLocalStorageBoolean } from "../localStorage";

describe("localStorage boolean", () => {
  const key = "localStorageBooleanTest";

  beforeEach(() => {
    // 每次跑测试前先清除本地缓存
    const { remove } = useLocalStorageBoolean(key);
    remove();
  });

  it("should be true if no cache", () => {
    const { isTrue } = useLocalStorageBoolean(key, true);

    expect(isTrue()).toBe(true);
  });

  it("should be false if no cache", () => {
    const { isTrue } = useLocalStorageBoolean(key, false);

    expect(isTrue()).toBe(false);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(key, "false");

    const { value } = useLocalStorageBoolean(key, true);

    expect(value.value).toBe(false);
  });

  it("should be toggle value", () => {
    const { value, toggle } = useLocalStorageBoolean(key, true);

    expect(value.value).toBe(true);

    toggle();

    expect(value.value).toBe(false);
  });
});
