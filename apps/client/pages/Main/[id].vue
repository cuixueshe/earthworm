<template>
  <div class="w-full flex flex-col pt-2">
    <template v-if="isLoading">
      <Loading></Loading>
    </template>
    <template v-else>
      <Tool></Tool>
      <Game></Game>
    </template>
  </div>
</template>

<script setup lang="ts">
import Game from '~/components/main/Game.vue';
import Tool from '~/components/main/Tool.vue';
import Loading from '~/components/Loading.vue';
import { useCourseStore } from "~/store/course";
import { useGameMode } from "~/composables/main/game";
import { useRoute } from "vue-router";
import { definePageMeta } from "#imports";
import { onMounted, ref } from "vue";

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(true)
const route = useRoute();
const coursesStore = useCourseStore();
const { showQuestion } = useGameMode();

showQuestion();

onMounted(async () => {
  const id = Number(route.params.id)
  const oldId = coursesStore.currentCourse?.id

  // 说明当前课程数据有缓存，不需要重新请求
  if (id === oldId) {
    isLoading.value = false
    return
  }

  await coursesStore.setup(id);
  isLoading.value = false
})

</script>
