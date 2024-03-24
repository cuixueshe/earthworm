import { vi, it, expect, describe } from "vitest";
import {
  isMobileSystem
} from "../system";

describe("system", () => {
  it('should return true when running on a mobile system', () => {
    // 模拟在移动设备上运行的环境
    document.documentElement.ontouchstart = vi.fn();

    // 调用被测试函数
    const result = isMobileSystem();

    // 断言结果为true
    expect(result).toBe(true);

    // 清除模拟的环境
    delete document.documentElement.ontouchstart;
  });

  it('should return false when running on a non-mobile system', () => {
    // 模拟在非移动设备上运行的环境
    delete document.documentElement.ontouchstart;

    // 调用被测试函数
    const result = isMobileSystem();
    console.log(result, "ontouchstart" in document.documentElement, '8888')
    // 断言结果为false
    expect(result).toBe(false);
  });
});
