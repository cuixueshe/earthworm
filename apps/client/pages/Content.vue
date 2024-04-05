<template>
  <main class="flex">
    <div class="bg-base-200 rounded-box flex-none">
      <PageNavigation />
    </div>
    <div
      class="pl-8 h-screen"
      style="overflow-y: auto"
    >
      <NuxtPage />
    </div>
  </main>
</template>

<script setup lang="ts"></script>
