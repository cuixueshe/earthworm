import { it, expect, describe, beforeEach } from "vitest";
import { LOCAL_SUBMIT_KEY, useSubmitKey } from "../submitKey";

describe("set submit key", () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_SUBMIT_KEY);
  });
  it("default value should be Enter if no cache", () => {
    const { showSubmitKey } = useSubmitKey();
    expect(showSubmitKey()).toBe("Enter");
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(LOCAL_SUBMIT_KEY, "Space");
    const { showSubmitKey } = useSubmitKey();
    expect(showSubmitKey()).toBe("Space");
  });

  it("should be change value", () => {
    const { showSubmitKey, handleCheckRadio } = useSubmitKey();
    const mockData = {
      label: "都支持",
      value: "All",
      defaultChecked: false,
    };
    handleCheckRadio(mockData);
    expect(showSubmitKey()).toBe("All");
  });
});
