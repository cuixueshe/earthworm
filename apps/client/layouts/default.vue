<template>
  <div
    class="w-full h-full bg-white dark:bg-theme-dark transition-colors dark:text-slate-300 text-slate-600"
  >
    <Navbar></Navbar>
    <div
      class="flex flex-col h-fit min-h-screen xl:w-[1200px] m-auto xl:px-2 px-24"
    >
      <div class="flex-1 flex">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
