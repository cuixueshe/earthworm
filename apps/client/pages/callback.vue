<!-- 用于 logto 的登录回调 -->
<script setup lang="ts">
import { useHandleSignInCallback, useLogto } from "@logto/vue";
import { navigateTo } from "nuxt/app";
import { onMounted } from "vue";

import { useUsername } from "~/composables/user/username";
import { getSignInCallback } from "~/services/auth";
import { useGameStore } from "~/store/game";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const logto = useLogto();

const { isLoading } = useHandleSignInCallback(async () => {
  const res = await logto.fetchUserInfo();
  userStore.initUser(res!);

  await navigateTo(getSignInCallback());
});
const { isShowModal, username, handleConfirm, initUsername, checkUsername } = useUsername();
onMounted(() => {
  const email = userStore.userInfo?.email!;
  initUsername(email);
});
const gameStore = useGameStore();

const { courseId } = await gameStore.startGame();
const handleChangeUsername = () => {
  handleConfirm(() => {
    // 跳转到game页面
    navigateTo(`/main/${courseId}`);
  });
};
</script>

<template>
  <!-- When it's working in progress -->
  <p v-if="isLoading">Redirecting...</p>
  <dialog
    class="modal"
    :open="isShowModal"
  >
    <div class="modal-box">
      <h3 class="mb-2 text-lg font-bold">设置用户名</h3>
      <input
        v-model="username"
        type="text"
        placeholder="请输入用户名"
        class="input input-bordered w-full"
        @change="checkUsername"
        maxlength="20"
        @keydown.enter="handleChangeUsername"
      />
      <span class="text-xs text-gray-400">用户名默认采用邮箱@符号前的部分，也可以自定义</span>
      <div class="modal-action">
        <!-- <form method="dialog">
          <button
            class="btn"
            @click="handleCancel(resetForm)"
          >
            取消
          </button>
        </form> -->

        <button
          class="btn btn-primary"
          type="submit"
          @click="handleChangeUsername"
        >
          确定
        </button>
      </div>
    </div>
  </dialog>
</template>
