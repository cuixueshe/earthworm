<template>
  <div
    class="w-full h-full bg-white dark:bg-theme-dark transition-colors dark:text-slate-300 text-slate-600"
  >
    <div
      class="flex flex-col h-fit min-h-screen m-auto items-center"
    >
      <Navbar></Navbar>
      <div class="flex-1 flex md:w-[1200px] w-full">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
