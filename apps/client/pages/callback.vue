<!-- Logto login callback page -->
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

  // New user who needs to set a username
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

// If login fails, redirect to home page
watch(error, (newError) => {
  if (newError) {
    toast.error(`Đăng nhập thất bại`, {
      description: `Vui lòng xóa bộ nhớ cache và thử lại. Lỗi: ${newError}`,
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
      empty: "Tên người dùng không được để trống",
      minLength: `Tên người dùng phải có ít nhất ${minLength} ký tự`,
      invalid:
        "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới, và phải bắt đầu bằng chữ cái hoặc dấu gạch dưới",
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
        <h3 class="mb-4 text-lg font-bold">Thiết lập tên người dùng</h3>
        <input
          v-model="username"
          type="text"
          placeholder="Nhập tên người dùng"
          class="input input-sm input-bordered w-full"
          maxlength="20"
          @keydown.enter="handleChangeUsername"
        />
        <div class="modal-action">
          <UButton
            type="submit"
            @click="handleChangeUsername"
          >
            Xác nhận
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
