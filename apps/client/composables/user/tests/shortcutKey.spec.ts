import { it, expect, describe, beforeEach } from "vitest";
import {
  useShortcutDialogMode,
  CUSTOM_SHORTCUT_KEY,
  useShortcutKeyMode,
} from "../shortcutKey";
import UserSetting from "~/components/user/Setting.vue";
import { mount } from "@vue/test-utils";

describe("exchange shortcut key dialog", () => {
  const { showModal, handleEdit, handleCloseDialog } = useShortcutDialogMode();

  it("open the dialog", () => {
    handleEdit("");
    expect(showModal.value).toBe(true);
  });

  it("close the dialog", () => {
    handleCloseDialog();
    expect(showModal.value).toBe(false);
  });
});

describe("set shortcut key", () => {
  // how to do
  it.skip("change shortcut key", () => {});
});
