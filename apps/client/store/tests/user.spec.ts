import { setActivePinia, createPinia } from "pinia";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { useUserStore, type User, type SignupFormValues } from "../user";

function generateUserInfo() {
  return {
    userId: "123",
    username: "JohnDoe",
    phone: "1234567890",
  };
}

function generateSignupInfo() {
  return {
    name: "JohnDoe",
    phone: "12345678901",
    password: "Password123",
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

  it("should update user store on successful signup", async () => {
    const signupInfo = generateSignupInfo();
    const userStore = useUserStore();

    await mockSignup(signupInfo);

    expect(userStore.user).toBeDefined();
    expect(userStore.user?.username).toBe(signupInfo.name);
    expect(userStore.user?.phone).toBe(signupInfo.phone);
  });
});

async function mockSignup(signupInfo: SignupFormValues) {
  const userStore = useUserStore();
  userStore.initUser({
    userId: "newUserId",
    username: signupInfo.name,
    phone: signupInfo.phone,
  });
}
