import { describe, expect, it, vi } from "vitest";

import { useUserStore } from "~/store/user";
import { useUsername } from "../username";

describe("useUsername", () => {
  it("should return false if username is empty", () => {
    const { checkUsername, isShowModal, username } = useUsername();
    username.value = "";
    const result = checkUsername();
    expect(result).toBe(false);
    expect(isShowModal.value).toBe(true);
  });

  it("should return false if username is less than 2 characters", () => {
    const { checkUsername, isShowModal, username } = useUsername();
    username.value = "a";
    const result = checkUsername();
    expect(result).toBe(false);
    expect(isShowModal.value).toBe(true);
  });

  it("should call userStore.updateUserInfo and hide modal on successful username update", async () => {
    useUserStore().updateUserInfo = vi.fn().mockResolvedValue(true);
    const { username, handleConfirm, isShowModal } = useUsername();
    username.value = "example";
    await handleConfirm(() => {});
    expect(useUserStore().updateUserInfo).toHaveBeenCalledWith({
      ...useUserStore().userInfo,
      name: "example",
    });
    expect(isShowModal.value).toBe(false);
  });

  it("should not call userStore.updateUserInfo on unsuccessful username update", async () => {
    useUserStore().updateUserInfo = vi.fn().mockResolvedValue(undefined);
    const { username, handleConfirm, isShowModal } = useUsername();
    username.value = "example";
    await handleConfirm(() => {});
    expect(useUserStore().updateUserInfo).toHaveBeenCalledWith({
      ...useUserStore().userInfo,
      name: "example",
    });
    expect(isShowModal.value).toBe(true);
  });
});
