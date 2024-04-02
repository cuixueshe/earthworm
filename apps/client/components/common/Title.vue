<template>
  <div class="mx-auto text-center my-5">
    <h2
      class="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-gray-300 dark:from-purple-600 dark:to-gray-500"
    >
      {{ title }}
    </h2>

    <div class="mt-5">
      <template
        v-for="(desc_item, desc_index) in description"
        :key="desc_index"
      >
        <p class="pt-2 text-center dark:text-gray-500 text-gray-800 lg:text-xl">
          {{ desc_item }}
        </p>
      </template>
    </div>
    <div class="mt-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
});

const { title, description } = props;
</script>

<style scoped></style>
