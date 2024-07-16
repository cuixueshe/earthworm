<template>
  <div
    class="flex w-full items-center justify-between rounded-lg bg-purple-600 px-4 py-1 text-white"
    v-if="showAlert"
  >
    <span class="font-bold"
      >【邀请函】加入 Earthworm 创始会员 与我们一起成就更好的英语学习平台</span
    >
    <div class="flex space-x-4">
      <button
        class="text-black"
        @click="handleCancel"
      >
        不感兴趣
      </button>
      <button
        class="rounded-lg bg-white px-4 font-bold text-purple-600"
        @click="handleShowDetails"
      >
        查看详情
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showAlert = ref(true);

function handleCancel() {
  showAlert.value = false;
}

function handleShowDetails() {
  window.open("https://earthworm-docs.cuixueshe.com/get-started/founding-member.html", "_blank");
  showAlert.value = false;
}
</script>

<style scoped></style>
