<template>
  <div class="mx-auto max-w-3xl text-center my-5">
    <p
      class="w-full text-black font-extrabold leading-30 dark:text-white text-4xl"
    >
      {{ title }}
    </p>

    <template
      v-for="(desc_item, desc_index) in description"
      :key="desc_index"
    >
      <p
        class="text-gray-500 mx-auto mt-4 max-w-xl sm:text-xl/relaxed dark:text-gray-300"
      >
        {{ desc_item }}
      </p>
    </template>
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
