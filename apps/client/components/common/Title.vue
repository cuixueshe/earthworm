<template>
  <div class="mx-auto text-center my-5">
    <h2
      class="text-[28px] lg:text-5xl xl:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-200 dark:from-purple-600 dark:to-gray-100"
    >
      {{ title }}
    </h2>

    <div class="mt-5">
      <template
        v-for="(desc_item, desc_index) in description"
        :key="desc_index"
      >
        <p class="pt-2 text-center dark:text-gray-300 text-gray-800 text-sm lg:text-xl">
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
