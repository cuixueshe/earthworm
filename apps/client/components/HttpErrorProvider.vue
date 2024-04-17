<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { injectHttpStatusErrorHandler } from "~/api/http";
import Message from "~/components/main/Message/useMessage";
import { signIn } from "~/services/auth";

useHttpStatusError();

function useHttpStatusError() {
  injectHttpStatusErrorHandler(async (errMessage, statusCode) => {
    switch (statusCode) {
      case 400:
        Message.error(errMessage);
        break;
      case 401:
        Message.error(errMessage, {
          duration: 2000,
          onLeave() {
            signIn(window.location.pathname);
          },
        });
        break;
    }
  });
}
</script>

<style scoped></style>
~/store/user
