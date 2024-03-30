<template>
  <div class="mx-auto text-center my-5">
    <p class="sm:text-2xl text-center font-bold dark:text-white xl:text-5xl lg:text-5xl">
      {{ title }}
    </p>

    <p class='mt-5'>
      <template
      v-for="(desc_item, desc_index) in description"
      :key="desc_index"
    >
      <p class="pt-2 text-center dark:text-gray-500 lg:text-xl">
        {{ desc_item }}
      </p>
    </template>
    </p>
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
