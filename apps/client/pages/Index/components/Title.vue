<template>
  <div class="mx-auto max-w-3xl text-center">
    <p
      class="w-full font-extrabold text-transparent s-5xl leading-30 dark:text-white text-black"
    >
      {{ title }}
    </p>

    <template
      v-for="(desc_item, desc_index) in description"
      :key="desc_index"
    >
      <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed dark:text-gray-300 text-gray-800">
        {{ desc_item }}
      </p>
    </template>
    <div class="mt-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";

const props = defineProps({
  title: String,
  description: Array,
});

const { title, description } = toRefs(props);
</script>

<style scoped></style>
