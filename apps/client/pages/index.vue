<script setup lang="ts">

</script>

<template>
  <div class="container w-full">
    <section class="flex md:flex-row md:justify-between justify-center flex-col py-8">
      <div class="w-1/2">
        <div class="flex mb-12">
          <img width="160" height="160" class="rounded-xl overflow-hidden mr-2" src="/logo.png" alt="earth-worm-logo">
          <h1 class="w-48 text-6xl font-black leading-snug text-wrap text-[#C683D7]">Earth Worm</h1>
        </div>
        <div class="mb-12 leading-loose text-3xl opacity-80 items-center">
          <div class="">Why aren’t you good at English?</div>
          <div class="align-middle">It’s because you haven’t used Earthworm yet! 🤪 <i class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-2xl p-[2px]"></i></div>
        </div>
        <button class="btn w-48"> Go and get it <kbd class="kbd"> ↵ </kbd></button>
      </div>
      <div class="w-1/2 flex items-center justify-center group select-none cursor-pointer">
        <div class="text-[220px] text-center group-hover:-skew-y-12 group-hover:rotate-12 transition-all">📖</div>
        <div class="text-[80px] -ml-28 text-center color-gray group-hover:-skew-y-12 group-hover:rotate-[20deg] group-hover:-ml-32 group-hover:-mt-12  transition-all">🪱</div>
      </div>
    </section>
    <section class="flex flex-col py-8">
      <h2 class="text-4xl text-center">What is Earthworm?</h2> 
      <div class="rounded-3xl border bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90 w-1/2">
        <div class="h-[330px] flex"></div>
      </div>
      <div class="w-1/2"></div>
      <div class="w-1/2"></div>
      <div class="w-1/2"></div>
    </section>
    <section class="flex flex-col py-8">
      <h2 class="text-4xl text-center">Why Earthworm?</h2> 
      
    </section>
  </div>
</template>
