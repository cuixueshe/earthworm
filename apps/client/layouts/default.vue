<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-100vh min-h-screen xl:w-[1200px] m-auto xl:px-2 px-24">
    <Navbar></Navbar>
    <div class="flex-1">
      <slot></slot>
    </div>
    <Footer></Footer>
  </div>
</template>