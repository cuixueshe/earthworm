<template>
  <div>
    <ul
      v-if="toc && toc.links"
      class="menu w-56 rounded-box"
    >
      <p class="text-lg">Table of Contents</p>
      <li
        v-for="link in toc.links"
        :key="link.text"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  toc: {
    type: Object,
    required: true,
  },
});
</script>
