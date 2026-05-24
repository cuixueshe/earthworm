import { TestingModule } from "@nestjs/testing";

import { LogtoService } from "../../src/logto/logto.service";
import { UserEntity } from "../../src/user/user.decorators";

export function createUser(): UserEntity {
  return {
    userId: "123456",
  };
}

// NOTE: Fix incorrect environment variables when imported before AppModule
export const getTokenOwner = () => process.env.LOGTO_CLIENT_ID;

export async function createLogtoUser(builder: TestingModule, username: string) {
  const logto = builder.get(LogtoService);

  const params = new URLSearchParams([["search.username", username]]);
  const { data: users } = await logto.logtoApi.get("/api/users", {
    params,
  });

  for (const user of users) {
    await logto.logtoApi.delete(`/api/users/${user.id}`);
  }

  // // 2. Create a user
  const { data } = await logto.logtoApi.post("/api/users", {
    username,
  });

  return { userId: data.id, username };
}
