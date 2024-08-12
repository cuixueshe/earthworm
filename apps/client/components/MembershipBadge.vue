<template>
  <div>
    <UIcon
      v-if="userStore.isFounderMembership()"
      name="i-ph-crown-simple-fill"
      class="glimmer relative overflow-hidden bg-yellow-400"
      title="尊贵的创始会员,感谢您对 Earthworm 的大力支持！"
      style="width: 20px; height: 20px"
    >
    </UIcon>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
</script>

<style scoped>
.glimmer {
  background: linear-gradient(-45deg, #ffd700 40%, #fafafa 50%, #ffd700 60%);
  background-size: 300%;
  background-position-x: 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  to {
    background-position-x: 0%;
  }
}
</style>
