<template>
  <div>
    <span
      v-if="userStore.isFounderMembership()"
      class="i-ph-crown-simple-fill relative overflow-hidden bg-yellow-400"
      title="尊贵的创始会员,感谢您对 Earthworm 的大力支持！"
      style="width: 20px; height: 20px"
    >
      <div class="glimmer"></div>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<style scoped>
.glimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(139, 0, 0, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: glimmer 2s infinite;
}

@keyframes glimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* 添加浏览器前缀 做浏览器的兼容 */
@-webkit-keyframes glimmer {
  0% {
    -webkit-transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(100%);
  }
}

.glimmer {
  -webkit-animation: glimmer 2s infinite;
}
</style>
