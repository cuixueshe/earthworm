<template>
  <div class="card achievement">
    <div class="active">
      <span class="active-label">使用中</span>
    </div>
    <figure>
      <img
        src="/contributor.png"
        alt="contributor"
        class="rounded-xl w-[110px] h-[110px] mb-5"
      />
    </figure>
    <div class="items-center justify-center text-center">
      <p class="mb-3 text-gray-500 active-name">成就名</p>
      <p class="text-xs text-gray-500 active-name">获得时间: 2024/4/2</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.achievement {
  position: relative;
  width: 170px;
  height: 220px;
  padding: 20px 30px 20px 30pxl;
  justify-content: center;
  border: 1px solid rgba(166, 166, 166, 1);
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  border: 1px solid rgba(232, 121, 249, 1);

  @apply rounded-md;
}
.active {
  position: absolute;
  right: 0;
  top: 0;
  width: 36px;
  height: 14px;
  opacity: 1;
  border-radius: 2px;
  background: rgba(232, 121, 249, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 6px 2px 6px;
}
.active-label {
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 9.68px;
  color: #fff;
  text-align: left;
  left: 6px;
  top: 2px;
  width: 24px;
  height: 10px;
  opacity: 1;
  display: flex;
}
.active-name {
  color: rgba(172, 51, 193, 1);
}
</style>
