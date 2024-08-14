<template>
  <NuxtLink
    v-if="video"
    target="_blank"
    class="flex cursor-pointer items-center fill-current text-xl hover:text-fuchsia-500"
    :href="video"
  >
    <UTooltip text="边看边练">
      <UIcon
        name="i-simple-icons-bilibili"
        class="h-5 w-5"
      />
    </UTooltip>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  video?: string;
}>();
</script>
