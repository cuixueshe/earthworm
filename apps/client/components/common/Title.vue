<template>
  <div class="mx-auto max-w-3xl text-center my-5">
    <h2 class="text-4xl text-center">
      {{ title }}
    </h2>

    <template
      v-for="(desc_item, desc_index) in description"
      :key="desc_index"
    >
      <p class="pt-2 text-center">
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
