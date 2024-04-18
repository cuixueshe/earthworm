import { type UserInfoResponse } from "@logto/vue";

import { updateUserinfo } from "~/api/userInfo";
import { useUserStore } from "~/store/user";

export function useUserInfo() {
  const userStore = useUserStore();
  async function updateUserInfo(e: Event) {
    const res = await updateUserinfo({ name: (e.target as HTMLInputElement).value });
    userStore.initUser(res!.data as UserInfoResponse);
  }
  return {
    updateUserInfo,
  };
}
