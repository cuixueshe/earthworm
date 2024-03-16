<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { injectHttpStatusErrorHandler } from "~/api/http";
import { useUserStore } from "~/store/user";

useHttpStatusError();

function useHttpStatusError() {
  const message = useMessage();
  const router = useRouter();

  injectHttpStatusErrorHandler(async (errMessage, statusCode) => {
    switch (statusCode) {
      case 400:
        message.error(errMessage);
        break;
      case 401:
        message.error(errMessage, {
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
