import { type UserInfoResponse } from "@logto/vue";

import { updateUsername } from "~/api/userInfo";
import { useUserStore } from "~/store/user";

export function useUserInfo() {
  const userStore = useUserStore();
  async function updateUserName(e: Event) {
    const res = await updateUsername((e.target as HTMLInputElement).value);
    userStore.initUser(res.data as UserInfoResponse);
  }
  return {
    updateUserName,
  };
}
