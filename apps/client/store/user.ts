import { type UserInfoResponse } from "@logto/vue";
import { defineStore } from "pinia";
import { computed, ref, toValue } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<UserInfoResponse>();

  function initUser(userInfoResponse: UserInfoResponse) {
    userInfo.value = userInfoResponse;
  }

  const userNameGetter = computed(() => {
    const user = toValue(userInfo);

    if (!user) {
      return "";
    }

    const { username, name, email } = user;
    return name || username || email?.split("@").at(0);
  });

  function updateUserInfo(userInfoResponse: Partial<UserInfoResponse>) {
    // 更新本地用户信息
    userInfo.value = { ...userInfo.value, ...userInfoResponse } as UserInfoResponse;
  }

  return {
    initUser,
    userInfo,
    userNameGetter,
    updateUserInfo,
  };
});
