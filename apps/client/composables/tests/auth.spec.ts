import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchLogin, fetchSignUp } from "~/api/auth";
import { useUserStore } from "~/store/user";
import { getToken } from "~/utils/token";
import { useAuth } from "../auth";

vi.mock("~/api/auth");

const userInfo = {
  userId: "1",
  username: "test",
  phone: "13111111111",
  password: "12312312",
};

function userInformation() {
  return {
    token: "token",
    user: userInfo,
  };
}

vi.mocked(fetchLogin).mockImplementation(async ({ password, phone }) =>
  userInformation()
);

vi.mocked(fetchSignUp).mockImplementation(async ({ phone, name, password }) =>
  userInformation()
);

describe("auth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should save login user information", async () => {
    const { login } = useAuth();

    await login({
      phone: userInfo.phone,
      password: userInfo.password,
    });

    expectUserInformation();
  });

  it("should save signup user information", async () => {
    const { signup } = useAuth();

    await signup({
      phone: userInfo.phone,
      name: userInfo.username,
      password: userInfo.password,
    });

    expectUserInformation();
  });
});

function expectUserInformation() {
  const store = useUserStore();

  expect(store.user).toEqual(userInfo);
  expect(getToken()).toBe(userInformation().token);
}
