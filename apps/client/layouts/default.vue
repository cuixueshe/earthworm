<script setup lang="ts">

</script>

<template>
  <div class="w-full h-full bg-white dark:bg-slate-900 transition-colors dark:text-slate-300">
    <div class="flex flex-col min-h-100vh min-h-screen xl:w-[1200px] m-auto xl:px-2 px-24">
      <Navbar></Navbar>
      <div class="flex-1">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>