import { setActivePinia, createPinia } from "pinia";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { useUserStore, type User } from "../user";

function generateUserInfo() {
  return {
    userId: "123",
    username: "JohnDoe",
    phone: "1234567890",
  };
}

describe("user", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should login user", () => {
    const mockUser = generateUserInfo();
    const userStore = useUserStore();

    userStore.initUser(mockUser);

    expect(userStore.user).toEqual(mockUser);
    expect(userStore.getUserInfo()).toMatchInlineSnapshot(
      `"{"userId":"123","username":"JohnDoe","phone":"1234567890"}"`
    );
  });

  it("should restore user", () => {
    const mockUser = generateUserInfo();
    const userStore = useUserStore();
    userStore.initUser(mockUser);

    userStore.user = undefined;
    userStore.restoreUser();

    expect(userStore.user).toEqual(mockUser);
  });

  it("should logout user", () => {
    const mockUser = generateUserInfo();
    const userStore = useUserStore();
    userStore.initUser(mockUser);

    userStore.logoutUser();

    expect(userStore.user).toBeFalsy();
    expect(userStore.getUserInfo()).toBeFalsy();
  });
});
