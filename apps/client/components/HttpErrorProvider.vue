<template>
  <slot></slot>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { injectHttpStatusErrorHandler } from "~/api/http";
  import { useUserStore } from "~/store/user";
  import Message from "~/components/main/Message/Message";
  useHttpStatusError();

  function useHttpStatusError() {
    const router = useRouter();

    injectHttpStatusErrorHandler(async (errMessage, statusCode) => {
      switch (statusCode) {
        case 400:
          Message.error(errMessage);
          break;
        case 401:
          Message.error(errMessage, {
            duration: 500,
            onLeave() {
              const callback = window.location.pathname;
              // 鉴权失败，退出用户到登录页面
              useUserStore().logoutUser();
              router.push(`/auth/login?callback=${callback}`);
            },
          });
          break;
      }
    });
  }
</script>

<style scoped></style>
