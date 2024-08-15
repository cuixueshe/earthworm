<template>
  <div class="mb-4">
    <h1 class="text-center text-2xl font-bold text-purple-800 dark:text-white">{{ title }}</h1>
    <div class="absolute right-2 top-2">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        @click="$emit('close')"
        tabindex="-1"
        :ui="{ color: { gray: { ghost: 'dark:hover:bg-gray-600' } } }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
