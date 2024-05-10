<!-- 用于 logto 的登录回调 -->
<script setup lang="ts">
import { useHandleSignInCallback, useLogto } from "@logto/vue";
import { navigateTo } from "nuxt/app";
import { ref } from "vue";

import { fetchUserSetup } from "~/api/user";
import Message from "~/components/main/Message/useMessage";
import { getSignInCallback } from "~/services/auth";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const logto = useLogto();
const { username, isLoadingFetchUserSetup, isShowSettingUsernameModal, handleChangeUsername } =
  useUsername();

const { isLoading } = useHandleSignInCallback(async () => {
  const res = await logto.fetchUserInfo();
  userStore.initUser(res!);

  // 新用户并且没有用户名需要设置
  if (userStore.isNewUser()) {
    isShowSettingUsernameModal.value = true;
  } else {
    await navigateTo(getSignInCallback());
  }
});

function useUsername() {
  const username = ref("");
  const isShowSettingUsernameModal = ref(false);
  const isLoadingFetchUserSetup = ref(false);

  async function handleChangeUsername() {
    if (!checkUsername()) return;

    isLoadingFetchUserSetup.value = true;
    await fetchUserSetup({
      username: username.value,
      avatar: userStore.userInfo?.picture!,
    });

    const res = await logto.fetchUserInfo();
    isLoadingFetchUserSetup.value = false;

    userStore.initUser(res!);
    navigateTo(getSignInCallback());
    isShowSettingUsernameModal.value = false;
  }

  function checkUsername() {
    const minLength = 2;
    const errorMessage = {
      empty: "用户名不能为空",
      minLength: `用户名至少输入 ${minLength} 个字符`,
      invalid: "用户名只能包含字母、数字和下划线，且首字符必须是字母或下划线",
    };

    if (!username.value) {
      Message.error(errorMessage.empty);
      return false;
    }

    if (username.value.length < minLength) {
      Message.error(errorMessage.minLength);
      return false;
    }

    const regex = /^[A-Za-z_]\w*$/;
    if (!regex.test(username.value)) {
      Message.error(errorMessage.invalid);
      return false;
    }

    return true;
  }

  return {
    checkUsername,
    username,
    isShowSettingUsernameModal,
    isLoadingFetchUserSetup,
    handleChangeUsername,
  };
}
</script>

<template>
  <div class="flex w-full flex-col pt-2">
    <template v-if="isLoading && !isShowSettingUsernameModal">
      <Loading></Loading>
    </template>
    <template v-else-if="isShowSettingUsernameModal">
      <dialog
        class="modal"
        :open="true"
      >
        <div class="modal-box">
          <h3 class="mb-4 text-lg font-bold">设置用户名</h3>
          <input
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            class="input input-bordered input-sm w-full"
            maxlength="20"
            @keydown.enter="handleChangeUsername"
          />
          <div class="modal-action">
            <button
              class="btn btn-primary"
              type="submit"
              @click="handleChangeUsername"
            >
              确定
              <span
                v-if="isLoadingFetchUserSetup"
                class="loading loading-spinner loading-lg"
              ></span>
            </button>
          </div>
        </div>
      </dialog>
    </template>
  </div>
</template>
