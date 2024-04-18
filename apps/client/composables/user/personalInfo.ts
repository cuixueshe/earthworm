import type { PersonalInfoDto } from "~/api/personalInfo";
import { updatePersonalInfo as updatedUserInfoApi } from "~/api/personalInfo";
import { useUserStore } from "~/store/user";

export function usePersonalInfo() {
  async function updatePersonalInfo(info: PersonalInfoDto) {
    const userStore = useUserStore();
    const res = await updatedUserInfoApi(userStore.userInfo?.sub!, info);
    if (!res) {
      return;
    }
    userStore.updateUserInfo({ ...info });
  }
  return {
    updatePersonalInfo,
  };
}
