<template>
  <slot></slot>
</template>

<script setup lang="ts">
import {
  injectApiCodeErrorHandler,
  injectHttpStatusErrorHandler,
} from "~/api/http";

useHttpStatusError();
useApiCodeError();

function useApiCodeError() {
  const message = useMessage();

  injectApiCodeErrorHandler((msg) => {
    message.error(msg);
  });
}

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
            router.push(`/auth/login?callback=${callback}`);
          },
        });
        break;
    }
  });
}
</script>

<style scoped></style>
