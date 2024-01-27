<template>
  <dialog className="modal" :open="authRequireModalState">
    <div className="modal-box">
      <h3 className="font-bold text-lg mb-4">✨</h3>
      <p class="text-xl px-4">注册以进行下一课</p>
      <div className="modal-action">
        <button class="btn" @click="hideAuthRequireModal">取消</button>
        <button class="btn" @click="navigateTo('/signup')">去注册</button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { useAuthRequire } from "~/composables/main/authRequire";

const { authRequireModalState, hideAuthRequireModal } = useAuthRequire()

</script>