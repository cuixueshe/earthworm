<template>
  <div
    class="h-full w-full bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300"
  >
    <div class="m-auto flex h-fit min-h-screen flex-col items-center">
      <Navbar />
      <div
        role="alert"
        class="alert alert-warning"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>我给系统升级一下 你先休息休息 出去溜达两圈 等会在玩 🤡</span>
      </div>
      <!-- 多一层内容的横向内边距是为了和 Navbar 对齐 -->
      <div class="flex w-full flex-1 px-5">
        <div class="mx-auto flex w-full max-w-screen-xl flex-1">
          <slot></slot>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
