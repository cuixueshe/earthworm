<template>
  <div
    class="mx-auto my-8 w-full max-w-screen-lg space-y-3 rounded-lg bg-white px-6 py-8 shadow-even-lg dark:bg-gray-900 dark:shadow-gray-700 md:px-12"
  >
    <div class="mb-4 flex items-center justify-between">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search ..."
        class="w-3/4 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <span class="text-gray-600 dark:text-gray-300"
        >Total: {{ masteredElementsStore.totalMasteredElementsCount }}</span
      >
    </div>
    <div
      v-for="item in filteredItems"
      :key="item.id"
      class="flex items-center justify-between rounded-lg bg-purple-100 p-4 transition-colors duration-300 hover:bg-purple-200 dark:bg-purple-700 dark:hover:bg-purple-600"
    >
      <div>
        <div class="text-lg font-bold text-purple-800 dark:text-white">
          {{ item.content.english }}
        </div>
        <div class="text-purple-600 dark:text-purple-300">
          Added on {{ formatDate(item.masteredAt) }}
        </div>
      </div>
      <div
        @click="removeItem(item)"
        class="cursor-pointer transition-transform duration-300 hover:scale-110"
      >
        <UTooltip text="删除">
          <UIcon
            name="i-ph-trash-bold"
            class="h-5 w-5"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Fuse from "fuse.js";
import { computed, onMounted, ref } from "vue";

import { useMasteredElementsStore } from "~/store/masteredElements";

const masteredElementsStore = useMasteredElementsStore();
const searchQuery = ref("");

const fuse = computed(
  () =>
    new Fuse(masteredElementsStore.masteredElements, {
      keys: ["content.english"],
      threshold: 0.4,
    }),
);

const filteredItems = computed(() => {
  if (!searchQuery.value) return masteredElementsStore.masteredElements;
  return fuse.value.search(searchQuery.value).map((result) => result.item);
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

function removeItem(item: any) {
  masteredElementsStore.removeElement(item.id + "");
}

onMounted(async () => {
  masteredElementsStore.setup();
});
</script>

<style scoped></style>
