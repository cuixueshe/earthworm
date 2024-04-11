<template>
  <main class="flex w-full">
    <div class="bg-base-200 flex-none">
      <PageNavigation />
    </div>
    <div class="w-full overflow-x-hidden h-[100vh - 4em] overflow-y-auto ml-8">
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts"></script>
