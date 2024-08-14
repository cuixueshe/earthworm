<!-- 用于 logto 的登录回调 -->
<script setup lang="ts">
import { useHandleSignInCallback } from "@logto/vue";
import { navigateTo } from "nuxt/app";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { toast } from "vue-sonner";

import { fetchCurrentUser } from "~/api/user";
import { getSignInCallback } from "~/services/auth";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const { username, isLoadingFetchUserSetup, isShowSettingUsernameModal, handleChangeUsername } =
  useUsername();

const useAutoRedirect = (delay: number) => {
  const redirectTimer = ref<NodeJS.Timeout | null>(null);
  const startAutoRedirect = () => {
    redirectTimer.value = setTimeout(() => {
      navigateTo("/");
    }, delay);
  };

  const stopAutoRedirect = () => {
    if (redirectTimer.value) {
      clearTimeout(redirectTimer.value);
      redirectTimer.value = null;
    }
  };

  return { startAutoRedirect, stopAutoRedirect };
};

const { startAutoRedirect, stopAutoRedirect } = useAutoRedirect(3000);

const { isLoading, error } = useHandleSignInCallback(async () => {
  stopAutoRedirect();
  const res = await fetchCurrentUser();
  userStore.initUser(res);

  // 新用户并且没有用户名需要设置
  if (userStore.isNewUser()) {
    isShowSettingUsernameModal.value = true;
  } else {
    await navigateTo(getSignInCallback());
  }
});

onMounted(() => {
  startAutoRedirect();
});

onUnmounted(() => {
  stopAutoRedirect();
});

// 如果登录失败，则跳转到首页
watch(error, (newError) => {
  if (newError) {
    toast.error(`登录失败`, {
      description: `请清空缓存后重新尝试 报错信息: ${newError}`,
      duration: 4000,
      onAutoClose: () => {
        navigateTo("/");
      },
    });
  }
});

function useUsername() {
  const username = ref("");
  const isShowSettingUsernameModal = ref(false);
  const isLoadingFetchUserSetup = ref(false);

  async function handleChangeUsername() {
    if (!checkUsername()) return;

    isLoadingFetchUserSetup.value = true;
    await userStore.setupNewUser({
      username: username.value,
      avatar: userStore.user?.avatar!,
    });
    isLoadingFetchUserSetup.value = false;

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
      toast.error(errorMessage.empty);
      return false;
    }

    if (username.value.length < minLength) {
      toast.error(errorMessage.minLength);
      return false;
    }

    const regex = /^[A-Za-z_]\w*$/;
    if (!regex.test(username.value)) {
      toast.error(errorMessage.invalid);
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
    <UModal
      v-model="isShowSettingUsernameModal"
      :ui="{ width: 'w-full sm:max-w-lg' }"
      prevent-close
    >
      <UCard>
        <h3 class="mb-4 text-lg font-bold">设置用户名</h3>
        <input
          v-model="username"
          type="text"
          placeholder="请输入用户名"
          class="input input-sm input-bordered w-full"
          maxlength="20"
          @keydown.enter="handleChangeUsername"
        />
        <div class="modal-action">
          <UButton
            type="submit"
            @click="handleChangeUsername"
          >
            确定
            <span
              v-if="isLoadingFetchUserSetup"
              class="loading loading-spinner loading-lg"
            ></span>
          </UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
