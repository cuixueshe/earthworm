import { it, expect, describe } from "vitest";
import { useShortcutDialogMode } from "../shortcutKey";

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
