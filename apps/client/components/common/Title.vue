<template>
  <div class="mx-auto my-5 text-center">
    <h2
      class="bg-gradient-to-r from-purple-600 to-gray-200 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-purple-600 dark:to-gray-100 lg:text-4xl xl:text-5xl"
    >
      {{ title }}
    </h2>

    <div class="mt-5">
      <template
        v-for="(descItem, descIndex) in description"
        :key="descIndex"
      >
        <p class="pt-2 text-center text-sm text-gray-800 dark:text-gray-300 lg:text-xl">
          {{ descItem }}
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
