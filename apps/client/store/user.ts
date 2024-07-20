import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "~/types";
import { fetchSetupNewUser } from "~/api/user";
import { MembershipType } from "~/types";

export const useUserStore = defineStore("user", () => {
  const user = ref<User>();

  function initUser(val: User) {
    user.value = val;
  }

  function isNewUser() {
    return !user.value?.username || !user.value?.avatar;
  }

  async function setupNewUser(info: { username: string; avatar: string }) {
    if (!user.value) return;

    const res = await fetchSetupNewUser({
      username: info.username,
      avatar: info.avatar,
    });

    user.value.username = res.username;
    user.value.avatar = res.avatar;
  }

  function isFounderMembership() {
    return user.value?.membership.details?.type === MembershipType.FOUNDER;
  }

  return {
    user,
    isNewUser,
    initUser,
    setupNewUser,
    isFounderMembership,
  };
});
