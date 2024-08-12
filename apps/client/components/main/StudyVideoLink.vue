<template>
  <NuxtLink
    v-if="video"
    target="_blank"
    class="flex cursor-pointer items-center fill-current text-xl hover:text-fuchsia-500"
    :href="video"
    :data-tippy-content="NOTE_TIP"
    @mouseenter="$lazyTippy"
  >
    <UIcon
      name="i-simple-icons-bilibili"
      class="h-5 w-5"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const NOTE_TIP = "边看边练";
defineProps<{
  video?: string;
}>();
</script>
