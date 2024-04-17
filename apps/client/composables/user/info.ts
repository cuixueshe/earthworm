import { updateUsername } from "~/api/userInfo";
import { useUserStore } from "~/store/user";

export function useUserInfo() {
  async function updateUserName(e: Event) {
    const { data } = await updateUsername({
      name: (e.target as HTMLInputElement).value,
    });
    const userStore = useUserStore();
    userStore.initUser(data!);
  }
  return {
    updateUserName,
  };
}
