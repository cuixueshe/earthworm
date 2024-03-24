import { beforeEach, describe, expect, it } from "vitest";
import {
  SHORTCUT_KEYS,
  useShortcutKeyMode,
} from "~/composables/user/shortcutKey";
import { DEFAULT_SHORTCUT_KEYS } from "~/store/user";

const SHORTCUT_KEY_TYPE = "sound";
const testKey = {
  ENTER: "Enter",
  LETTER_A: "a",
};

describe("set shortcut key", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("initial the shortcut key data", () => {
    it("should initial shortcut key data when localStorage doesn't have 'shortcutKeys' field", () => {
      const { setShortcutKeys } = useShortcutKeyMode();
      const shortcutKeysStr = JSON.stringify(DEFAULT_SHORTCUT_KEYS);

      setShortcutKeys();

      expect(localStorage.getItem(SHORTCUT_KEYS)).toBe(shortcutKeysStr);
    });

    it("should initial shortcut key data when localStorage has 'shortcutKeys' field", () => {
      const { setShortcutKeys, shortcutKeys } = useShortcutKeyMode();
      const storeShortcutKeys = {
        sound: "a",
        answer: "Ctrl+;",
      };

      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(storeShortcutKeys));

      setShortcutKeys();

      expect(shortcutKeys.value).toEqual(storeShortcutKeys);
    });
  });

  describe("open or close dialog", () => {
    it("should open the dialog when click 'edit' button", () => {
      const { handleEdit, showModal } = useShortcutKeyMode();

      handleEdit(SHORTCUT_KEY_TYPE);

      expect(showModal.value).toBeTruthy();
    });

    it("should close the dialog when press 'Enter' key", () => {
      const { showModal, handleEdit, handleKeydown } = useShortcutKeyMode();

      handleEdit(SHORTCUT_KEY_TYPE);
      handleKeydown(keydown({ key: testKey.ENTER }));

      expect(showModal.value).toBeFalsy();
    });
  });

  describe("save shortcut key", () => {
    it("should return when showModal is false", () => {
      const { handleKeydown, showModal } = useShortcutKeyMode();

      handleKeydown(keydown({ key: testKey.LETTER_A }));

      expect(showModal.value).toBeFalsy();
    });

    it("should store a single key to the localStorage", () => {
      const { shortcutKeys, handleEdit, handleKeydown } = useShortcutKeyMode();

      handleEdit(SHORTCUT_KEY_TYPE);

      handleKeydown(keydown({ key: testKey.LETTER_A }));
      handleKeydown(keydown({ key: testKey.ENTER }));

      expect(shortcutKeys.value[SHORTCUT_KEY_TYPE]).toBe(testKey.LETTER_A);
      expect(localStorage.getItem(SHORTCUT_KEYS)).toMatchInlineSnapshot(
        `"{"sound":"a","answer":"Ctrl+;"}"`
      );
    });

    it("should store key combination to the localStorage", () => {
      const { handleEdit, handleKeydown, shortcutKeys } = useShortcutKeyMode();

      handleEdit(SHORTCUT_KEY_TYPE);
      handleKeydown(keydown({ key: testKey.LETTER_A, ctrlKey: true }));
      handleKeydown(keydown({ key: testKey.ENTER }));

      expect(shortcutKeys.value[SHORTCUT_KEY_TYPE]).toBe("Ctrl+a");
      expect(localStorage.getItem(SHORTCUT_KEYS)).toMatchInlineSnapshot(
        `"{"sound":"Ctrl+a","answer":"Ctrl+;"}"`
      );
    });
  });

  describe("tip", () => {
    it("should return key combination tip", () => {
      const { shortcutKeyStr, shortcutKeyTip } = useShortcutKeyMode();

      shortcutKeyStr.value = `Ctrl+${testKey.LETTER_A}`;

      expect(shortcutKeyTip.value).toBe(`Ctrl 加上 ${testKey.LETTER_A}`);
    });

    it("should return single key tip", () => {
      const { shortcutKeyStr, shortcutKeyTip } = useShortcutKeyMode();
      shortcutKeyStr.value = testKey.LETTER_A;

      expect(shortcutKeyTip.value).toBe(testKey.LETTER_A);
    });
  });
});

function keydown(eventInitDict?: KeyboardEventInit | undefined) {
  return new KeyboardEvent("keydown", eventInitDict);
}
