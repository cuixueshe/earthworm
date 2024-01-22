<script setup lang="ts">
// definePageMeta({
//   layout: 'default'
// })
</script>

<template>
  <div class="container w-full">
    <section class="flex md:flex-row md:justify-between justify-center flex-col py-8">
      <div class="w-1/2">
        <div class="flex mb-12">
          <img width="160" height="160" class="rounded-xl overflow-hidden mr-2" src="/logo.png" alt="earth-worm-logo">
          <h1 class="w-48 text-6xl font-black leading-snug text-wrap text-[#C683D7]">Earth Worm</h1>
        </div>
        <div class="mb-12 leading-loose text-3xl opacity-60 items-center">
          <p>Why did you not good at English?</p>
          <p class="align-middle">Because you have not use Earthworm yet 🤪 !<i class="animate-wink inline-flex w-1 h-8 bg-white mx-2 leading-snug"></i></p>
        </div>
        <button class="btn w-48"> Go and get it <kbd class="kbd"> ↵ </kbd></button>
      </div>
      <div class="w-1/2 flex items-center justify-center group select-none cursor-pointer">
        <div class="text-[220px] text-center group-hover:-skew-y-12 group-hover:rotate-12 transition-all">📖</div>
        <div class="text-[80px] -ml-28 text-center color-gray group-hover:-skew-y-12 group-hover:rotate-[20deg] group-hover:-ml-32 group-hover:-mt-12  transition-all">🪱</div>
      </div>
    </section>
    <section class="flex flex-col">
      <h2>What's is Earthworm ?</h2> 
      
    </section>
  </div>
</template>
