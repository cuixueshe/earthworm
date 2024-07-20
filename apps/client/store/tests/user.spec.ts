import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";

import { useUserStore } from "../user";

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
    const userStore = useUserStore();

    userStore.initUser(generateUserInfo() as any);

    expect(userStore.user).toMatchInlineSnapshot(
      `
      {
        "phone": "1234567890",
        "userId": "123",
        "username": "JohnDoe",
      }
    `,
    );
  });
});
