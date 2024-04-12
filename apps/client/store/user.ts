import { defineStore } from "pinia";
import { type UserInfoResponse } from "@logto/vue";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<UserInfoResponse>();

  function initUser(userInfoResponse: UserInfoResponse) {
    userInfo.value = userInfoResponse;
  }

  return {
    initUser,
    userInfo,
  };
});
