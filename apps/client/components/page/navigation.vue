<template>
  <nav>
    <ul class="menu bg-base-200 w-64 rounded-box">
      <li
        v-for="link in navigation"
        :key="link._path"
      >
        <details open>
          <summary>{{ link.title }}</summary>
          <ul v-if="link.children">
            <li
              v-for="subLink in link.children"
              :key="subLink._path"
            >
              <NuxtLink :to="usePath(subLink._path)">{{
                subLink.title
              }}</NuxtLink>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { fetchContentNavigation, useAsyncData } from "#imports";

function usePath(path: string) {
  return `/content${path}`;
}

const { data: navigation }: any = await useAsyncData("navigation", () =>
  fetchContentNavigation()
);
</script>
