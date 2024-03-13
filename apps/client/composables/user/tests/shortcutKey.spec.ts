import { it, expect, describe } from "vitest";
import { DEFAULT_SHORTCUT_KEYS } from "~/store/user";
import {
  SHORTCUT_KEYS,
  useShortcutDialogMode,
  useShortcutKeyMode,
} from "../shortcutKey";

describe("exchange shortcut key dialog", () => {
  const { showModal, handleEdit, handleCloseDialog } = useShortcutDialogMode();

  it("open the dialog", () => {
    handleEdit("sound");
    expect(showModal.value).toBe(true);
  });

  it("close the dialog", () => {
    handleCloseDialog();
    expect(showModal.value).toBe(false);
  });
});

describe("set shortcut key", () => {
  it("should save default shortcut key in localStorage", () => {
    const shortcutKeysStr = JSON.stringify(DEFAULT_SHORTCUT_KEYS);
    const { setShortcutKeys } = useShortcutKeyMode();
    setShortcutKeys();

    expect(localStorage.getItem(SHORTCUT_KEYS)).toEqual(shortcutKeysStr);
  });

  describe("save key", () => {
    it("should save a single key", () => {
      const singleKey = "q";
      const EnterKey = "Enter";

      const { handleEdit } = useShortcutDialogMode();
      const { handleKeyup, shortcutKeys } = useShortcutKeyMode();

      handleEdit("sound");
      handleKeyup(new KeyboardEvent("keyup", { key: singleKey }));
      handleKeyup(new KeyboardEvent("keyup", { key: EnterKey }));

      expect(shortcutKeys.value).toEqual({
        sound: singleKey,
        answer: "Ctrl+;",
      });

      expect(localStorage.getItem(SHORTCUT_KEYS)).toMatchInlineSnapshot(
        `"{"sound":"q","answer":"Ctrl+;"}"`
      );
    });

    it("should save a combination key", () => {
      const { handleEdit } = useShortcutDialogMode();
      const { handleKeyup, shortcutKeys } = useShortcutKeyMode();

      handleEdit("sound");

      handleKeyup(new KeyboardEvent("keyup", { key: "k", ctrlKey: true }));

      handleKeyup(new KeyboardEvent("keyup", { key: "Enter" }));

      expect(shortcutKeys.value).toEqual({
        sound: "Ctrl+k",
        answer: "Ctrl+;",
      });

      expect(localStorage.getItem(SHORTCUT_KEYS)).toMatchInlineSnapshot(
        `"{"sound":"Ctrl+k","answer":"Ctrl+;"}"`
      );
    });
  });

  describe("key tip", () => {
    it("should return a single shortcut key tip", () => {
      const { handleEdit } = useShortcutDialogMode();
      const { shortcutKeyTip, handleKeyup } = useShortcutKeyMode();

      handleEdit("answer");

      handleKeyup(new KeyboardEvent("keyup", { key: "k" }));

      expect(shortcutKeyTip.value).toBe("k");
      handleKeyup(new KeyboardEvent("keyup", { key: "Enter" }));
    });

    it("should return a combination shortcut key tip", () => {
      const { handleEdit } = useShortcutDialogMode();
      const { shortcutKeyTip, handleKeyup } = useShortcutKeyMode();

      handleEdit("answer");

      handleKeyup(new KeyboardEvent("keyup", { key: "k", ctrlKey: true }));

      expect(shortcutKeyTip.value).toBe("Ctrl+k");
      handleKeyup(new KeyboardEvent("keyup", { key: "Enter" }));
    });
  });
});
