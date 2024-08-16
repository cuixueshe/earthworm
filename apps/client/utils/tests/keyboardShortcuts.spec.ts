import { beforeEach } from "node:test";

import { describe, expect, it, vi } from "vitest";

import { fireEvent } from "~/tests/helper/fireEvent";
import {
  cancelShortcut,
  cleanAllShortcut,
  createShortcut,
  parseShortcutKeys,
  registerShortcut,
} from "../keyboardShortcuts";

describe("keyboardShortcuts", () => {
  beforeEach(() => {
    cleanAllShortcut();
  });

  it("should trigger command when press Tab", () => {
    let command = vi.fn();
    registerShortcut("Tab", command);

    fireEvent.keyDown({ key: "tab" });

    expect(command).toBeCalled();
  });

  it("should trigger command when press Enter", () => {
    let command = vi.fn();
    registerShortcut("enter", command);

    fireEvent.keyDown({ key: "enter" });

    expect(command).toBeCalled();
  });

  it("should trigger command when press Command+; (Mac)", () => {
    let command = vi.fn();
    registerShortcut("Command+;", command);

    // 触发
    fireEvent.keyDown({
      metaKey: true,
      key: ";",
    });

    expect(command).toBeCalled();
  });

  it("should trigger command when press Ctrl+' and Ctrl+;", () => {
    let commandA = vi.fn();
    let commandB = vi.fn();

    registerShortcut("Ctrl+;", commandA);
    registerShortcut("Ctrl+'", commandB);

    // 触发
    fireEvent.keyDown({
      ctrlKey: true,
      key: ";",
    });
    fireEvent.keyDown({
      ctrlKey: true,
      key: "'",
    });

    expect(commandA).toBeCalled();
    expect(commandB).toBeCalled();
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

  it("should trigger command when press any shortcut key", () => {
    let command = vi.fn();
    registerShortcut("*", command);

    fireEvent.keyDown({ key: "1" });
    fireEvent.keyDown({ key: "a" });
    fireEvent.keyDown({ key: "[" });

    expect(command).toBeCalledTimes(3);
  });

  describe("cancel shortcut key", () => {
    it("single key", () => {
      let command = vi.fn();
      registerShortcut("enter", command);
      cancelShortcut("enter", command);

      // 触发
      fireEvent.keyDown({
        key: "enter",
      });

      expect(command).not.toBeCalled();
    });

    it("the key combination is a string", () => {
      let command = vi.fn();
      registerShortcut("Ctrl+p", command);
      cancelShortcut("Ctrl+p", command);

      // 触发
      fireEvent.keyDown({
        ctrlKey: true,
        key: "p",
      });

      expect(command).not.toBeCalled();
    });

    it("the key combination uses the shortcut object", () => {
      let command = vi.fn();
      const shortcut = createShortcut("Ctrl+p", command);

      registerShortcut("Ctrl+p", command);
      cancelShortcut(shortcut);

      // 触发
      fireEvent.keyDown({
        ctrlKey: true,
        key: "p",
      });

      expect(command).not.toBeCalled();
    });

    it("wildcard character", () => {
      let command = vi.fn();
      registerShortcut("*", command);

      cancelShortcut("*", command);
      fireEvent.keyDown({ key: "1" });

      expect(command).not.toBeCalled();
    });

    it("should remove all commands when only key is provided", () => {
      let commandA = vi.fn();
      let commandB = vi.fn();
      registerShortcut("enter", commandA);
      registerShortcut("enter", commandB);

      // 只传递 key，删除所有匹配的快捷键
      cancelShortcut("enter");

      // 触发
      fireEvent.keyDown({
        key: "enter",
      });

      expect(commandA).not.toBeCalled();
      expect(commandB).not.toBeCalled();
    });

    it("should remove all ctrl when only key is provided", () => {
      let commandA = vi.fn();
      let commandB = vi.fn();
      registerShortcut("ctrl+A", commandA);
      registerShortcut("ctrl+a", commandB);

      cancelShortcut("ctrl+a");

      fireEvent.keyDown({
        ctrlKey: true,
        key: "a",
      });

      expect(commandA).not.toBeCalled();
      expect(commandB).not.toBeCalled();
    });

    it("should remove all commands when only key is provided", () => {
      let commandA = vi.fn();
      let commandB = vi.fn();
      registerShortcut("command+A", commandA);
      registerShortcut("command+a", commandB);

      cancelShortcut("command+a");

      fireEvent.keyDown({
        metaKey: true,
        key: "a",
      });

      expect(commandA).not.toBeCalled();
      expect(commandB).not.toBeCalled();
    });
  });

  describe("utils function", () => {
    it("should return shortcut key list when use parseShortcutKeys", () => {
      const keysA = parseShortcutKeys("Ctrl+p");
      const keysB = parseShortcutKeys("Ctrl a", " ");
      const keysC = parseShortcutKeys("Ctrl a b c", " ");

      expect(keysA).toEqual(["Ctrl", "P"]);
      expect(keysB).toEqual(["Ctrl", "A"]);
      expect(keysC).toEqual(["Ctrl", "A", "B", "C"]);
    });
  });
});
