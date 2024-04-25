<template>
  <div class="flex w-full flex-col pt-2">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <MusicTool />
      <MusicGame />
    </template>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { useMusicStore } from "~/store/music";

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(true);
const route = useRoute();
const musicStore = useMusicStore();

onMounted(async () => {
  await musicStore.setup(Number(route.params.id));
  isLoading.value = false;
});
</script>
