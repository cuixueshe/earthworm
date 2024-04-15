<template>
  <div
    class="w-full h-full bg-white dark:bg-theme-dark transition-colors dark:text-slate-300 text-slate-600"
  >
    <div class="flex flex-col h-fit min-h-screen m-auto items-center">
      <Navbar />
      <div class="flex-1 flex w-full max-w-screen-xl px-6">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
