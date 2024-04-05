<template>
  <main class="flex">
    <div>
      <div class="text-sm breadcrumbs">
        <ul>
          <li
            v-for="url in route.path.split('/').splice(1)"
            :key="url"
          >
            {{ url }}
          </li>
        </ul>
      </div>
      <ContentRenderer
        class="prose"
        :value="data"
      />
    </div>
    <PageToc :toc="data?.body?.toc" />
  </main>
</template>

<script setup lang="ts">
import { queryContent, useAsyncData } from "#imports";
import type { MarkdownParsedContent } from "@nuxt/content/dist/runtime/types";
import { useRoute } from "vue-router";
const route = useRoute();
const path = usePath();

const { data }: any = await useAsyncData("home", () =>
  queryContent<MarkdownParsedContent>(path).findOne()
);

function usePath() {
  let path = route?.path.replace("/content", "");
  if (path === "") {
    path = "/";
  }
  return path;
}
</script>

<style>
.prose {
  min-width: 75ch;
}
</style>
