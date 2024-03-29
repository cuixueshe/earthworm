import { beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_SHORTCUT_KEYS,
  SHORTCUT_KEYS,
  useShortcutKeyMode,
} from "~/composables/user/shortcutKey";

describe("user defined shortcut key", () => {
  const soundKey = "sound";
  const answerKey = "answer";

  beforeEach(() => {
    const { handleCloseDialog } = useShortcutKeyMode();
    handleCloseDialog();
    localStorage.clear();
  });

  describe("shortcut key data", () => {
    it("should be the default shortcut key data if localStorage no cache", () => {
      const { shortcutKeys } = useShortcutKeyMode();

      expect(shortcutKeys.value).toEqual(DEFAULT_SHORTCUT_KEYS);
    });

    it("should be equal to cache data if localStorage has cache", () => {
      const storeShortcutKeys = {
        sound: "Ctrl+s",
        answer: "Ctrl+8",
        skip: "Ctrl+.",
      };

      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(storeShortcutKeys));
      const { shortcutKeys } = useShortcutKeyMode();

      expect(shortcutKeys.value).toEqual(storeShortcutKeys);
    });
  });

  describe("shortcut dialog", () => {
    it("should be false by default", () => {
      const { showModal } = useShortcutKeyMode();

      expect(showModal.value).toBeFalsy();
    });

    it("should be true when edit shortcut key", () => {
      const { showModal, handleEdit } = useShortcutKeyMode();

      handleEdit(soundKey);

      expect(showModal.value).toBeTruthy();
    });

    it("should be close the dialog when press Enter key", () => {
      const { showModal, handleEdit, handleKeydown } = useShortcutKeyMode();

      handleEdit(soundKey);
      handleKeydown({
        key: "Enter",
        preventDefault: () => {},
      } as KeyboardEvent);

      expect(showModal.value).toBeFalsy();
    });
  });

  describe("shortcut key set", () => {
    it("should be the shortcut key set invalid when the dialog is not open", () => {
      const { showModal, shortcutKeyStr, handleKeydown } = useShortcutKeyMode();

      expect(showModal.value).toBeFalsy();

      // Ctrl+s
      handleKeydown({
        key: "s",
        ctrlKey: true,
        preventDefault: () => {},
      } as KeyboardEvent);

      expect(shortcutKeyStr.value).toBe("");
    });

    it("should be the shortcut key is changed when the dialog is open", () => {
      const {
        showModal,
        shortcutKeyStr,
        shortcutKeyTip,
        handleEdit,
        handleKeydown,
      } = useShortcutKeyMode();

      handleEdit(soundKey); // open dialog

      expect(showModal.value).toBeTruthy();

      handleKeydown({
        key: "s",
        ctrlKey: true,
        preventDefault: () => {},
      } as KeyboardEvent);

      expect(shortcutKeyStr.value).toEqual("Ctrl+s");
      expect(shortcutKeyTip.value).toEqual("Ctrl 加上 s");
    });

    it("should be the shortcut key is set successfully when the dialog is open (single key)", () => {
      const { showModal, shortcutKeys, handleEdit, handleKeydown } =
        useShortcutKeyMode();

      handleEdit(soundKey);

      expect(showModal.value).toBeTruthy();

      handleKeydown({
        key: "Tab",
        preventDefault: () => {},
      } as KeyboardEvent);
      handleKeydown({
        key: "Enter",
        preventDefault: () => {},
      } as KeyboardEvent);

      expect(showModal.value).toBeFalsy();
      expect(shortcutKeys.value).toMatchObject({ [soundKey]: "Tab" });
    });

    it("should be the shortcut key is set successfully when the dialog is open (combination key)", () => {
      const { showModal, shortcutKeys, handleEdit, handleKeydown } =
        useShortcutKeyMode();

      handleEdit(answerKey);

      expect(showModal.value).toBeTruthy();

      handleKeydown({
        key: "s",
        ctrlKey: true,
        preventDefault: () => {},
      } as KeyboardEvent);
      handleKeydown({
        key: "Enter",
        preventDefault: () => {},
      } as KeyboardEvent);

      expect(showModal.value).toBeFalsy();
      expect(shortcutKeys.value).toMatchObject({ [answerKey]: "Ctrl+s" });
    });
  });
});
