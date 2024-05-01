<template>
  <div
    class="h-full w-full bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300"
  >
    <div class="m-auto flex h-fit min-h-screen flex-col items-center">
      <Navbar />
      <!-- 内容的横向内边距是为了和 Navbar 对齐 -->
      <div class="w-full px-5">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
