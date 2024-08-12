<template>
  <div
    class="h-full w-full bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300"
  >
    <div class="m-auto flex h-fit min-h-screen flex-col items-center">
      <Navbar />
      <FoundingMemberNotice></FoundingMemberNotice>
      <!-- 多一层内容的横向内边距是为了和 Navbar 对齐 -->
      <div class="flex w-full flex-1 px-5">
        <div class="mx-auto flex w-full max-w-screen-xl flex-1">
          <NuxtPage />
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <UserMenu />
</template>

<script setup lang="ts">
import FoundingMemberNotice from "../components/FoundingMemberNotice.vue";
</script>
