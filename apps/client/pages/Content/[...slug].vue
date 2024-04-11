<template>
  <main class="flex">
    <div>
      <div class="text-sm breadcrumbs mb-4">
        <ul>
          <li
            v-for="(url, index) in route.path.split('/').splice(1).slice(1)"
            :key="url"
          >
            <svg
              v-if="index === 0"
              class="mr-2.5 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
              />
            </svg>
            <a :href="'#' + url">{{ url }} </a>
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
