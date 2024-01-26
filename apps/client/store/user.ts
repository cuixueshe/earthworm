import { defineStore } from "pinia";

export interface User {
  userId: string;
  username: string;
  phone: string;
}

const LOCAL_STORAGE_KEY = "userInfo";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();

  function initUser(userInfo: User) {
    user.value = userInfo;
    saveUserInfo();
  }

  function logoutUser() {
    user.value = undefined;
    removeUserInfo();
  }

  function saveUserInfo() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user.value));
  }

  function removeUserInfo() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  function getUserInfo() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  function restoreUser() {
    const userInfoStringify = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (userInfoStringify) user.value = JSON.parse(userInfoStringify);
  }

  return {
    user,
    initUser,
    logoutUser,
    restoreUser,
    getUserInfo,
  };
});
