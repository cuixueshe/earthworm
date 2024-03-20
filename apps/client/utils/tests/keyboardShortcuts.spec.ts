import { vi, it, expect, describe } from "vitest";
import { fireEvent } from "~/tests/helper/fireEvent";
import {
  registerShortcut,
  cancelShortcut,
  cleanAllShortcut,
} from "../keyboardShortcuts";
import { beforeEach } from "node:test";

describe("keyboardShortcuts", () => {
  beforeEach(() => {
    cleanAllShortcut();
  });

  it("should trigger command when press cmd+p", () => {
    let command = vi.fn();

    registerShortcut("ctrl+p", command);

    // 触发
    fireEvent.keyDown({
      ctrlKey: true,
      key: "p",
    });

    expect(command).toBeCalled();
  });

  it("should trigger Shortcut key when press enter", () => {
    let command = vi.fn();

    registerShortcut("enter", command);

    // 触发
    fireEvent.keyDown({
      key: "enter",
    });

    expect(command).toBeCalled();
  });

  it("should trigger multiple same shortcut key", () => {
    let commandA = vi.fn();
    let commandB = vi.fn();

    registerShortcut("enter", commandA);
    registerShortcut("enter", commandB);

    // 触发
    fireEvent.keyDown({
      key: "enter",
    });

    expect(commandA).toBeCalled();
    expect(commandB).toBeCalled();
  });

  describe("cancel", () => {
    it("by shortcut", () => {
      let command = vi.fn();

      const shortcut = registerShortcut("enter", command);

      cancelShortcut(shortcut);

      // 触发
      fireEvent.keyDown({
        key: "enter",
      });

      expect(command).not.toBeCalled();
    });

    it("by name and command", () => {
      let command = vi.fn();

      registerShortcut("enter", command);

      cancelShortcut("enter", command);

      // 触发
      fireEvent.keyDown({
        key: "enter",
      });

      expect(command).not.toBeCalled();
    });
  });
});
