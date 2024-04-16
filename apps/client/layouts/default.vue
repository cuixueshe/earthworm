<template>
  <div
    class="h-full w-full bg-white text-slate-600 transition-colors dark:bg-theme-dark dark:text-slate-300"
  >
    <div class="m-auto flex h-fit min-h-screen flex-col items-center">
      <Navbar />
      <div class="flex w-full max-w-screen-xl flex-1 px-6">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
