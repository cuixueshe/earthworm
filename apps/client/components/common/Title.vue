<template>
  <div class="mx-auto text-center my-5">
    <h2
      class="text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-200 dark:from-purple-600 dark:to-gray-100"
    >
      {{ title }}
    </h2>

    <div class="mt-5">
      <template
        v-for="(descItem, descIndex) in description"
        :key="descIndex"
      >
        <p
          class="pt-2 text-center dark:text-gray-300 text-gray-800 text-sm lg:text-xl"
        >
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
