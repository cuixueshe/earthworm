import { http } from "./http";

interface Username {
  message: string;
}

export async function fetchUsername(newUsername: string) {
  return await http.patch<Username, Username>("/user/changeUsername", {
    username: newUsername,
  });
}
