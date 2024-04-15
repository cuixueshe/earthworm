import { defineStore } from "pinia";
import { type UserInfoResponse } from "@logto/vue";
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

  return {
    initUser,
    userInfo,
    userNameGetter,
  };
});
