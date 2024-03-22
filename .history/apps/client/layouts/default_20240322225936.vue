<template>
  <div class="w-full h-full bg-white dark:bg-slate-900 transition-colors dark:text-slate-300 text-slate-600">
    <div class="flex flex-col h-fit min-h-screen xl:w-[1200px] m-auto">
      <Navbar></Navbar>
      <div class="flex-1 flex">
        <slot></slot>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>
