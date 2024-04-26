<!-- 临时路由 提醒老用户去重新注册 -->
<!-- 一周后需要删除 -->
<template>
  <div class="flex w-full flex-col pt-2">
    <div class="flex h-3/4 flex-col items-center justify-center text-3xl">
      <p>感谢您的支持 之前是 MVP 版本 数据已经全部删档</p>
      <p>现在需要您重新注册帐号 并且已经支持邮箱注册 更保护您的隐私 💗</p>
      <button
        class="btn btn-secondary btn-active btn-lg mt-7"
        @click="signIn()"
      >
        去注册
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signIn } from "~/services/auth";
</script>

<style scoped></style>
