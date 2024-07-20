<template>
  <Teleport to="body">
    <div class="drawer drawer-end z-10">
      <input
        id="my-drawer"
        type="checkbox"
        class="drawer-toggle"
        v-model="open"
      />
      <div class="drawer-content"></div>
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <aside class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          <div class="flex items-center justify-between pb-5">
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    :src="userStore.user?.avatar"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="text-xl font-bold">{{ userStore.user?.username }}</div>
                <div class="text-sm opacity-50">{{ userStore.user?.name }}</div>
              </div>
            </div>

            <div>
              <label
                for="my-drawer"
                class="btn btn-square btn-ghost drawer-button btn-sm"
              >
                <span class="i-ph-x-bold h-6 w-6"></span>
              </label>
            </div>
          </div>

          <ul>
            <li
              v-for="(item, index) in showMenuOptions"
              :index="index"
              :key="item.name"
            >
              <span
                @click="item.eventName"
                class=""
              >
                <span
                  class="h-6 w-6"
                  :class="item.icon"
                ></span>
                <span class="text-sm font-medium">
                  {{ item.title }}
                </span>
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { navigateTo } from "#imports";
import { useRuntimeConfig } from "nuxt/app";
import { computed } from "vue";

import { Theme, useDarkMode } from "~/composables/darkMode";
import { useUserStore } from "~/store/user";

const { darkMode, toggleDarkMode } = useDarkMode();

const runtimeConfig = useRuntimeConfig();

const emit = defineEmits(["logout"]);
const open = defineModel("open");

const userStore = useUserStore();
const isDarkMode = computed(() => darkMode.value === Theme.DARK);

const showMenuOptions = computed(() => {
  return [
    {
      title: "设置",
      name: "setting",
      eventName: handleSetting,
      icon: "i-ph-gear",
    },
    {
      title: "编辑器",
      name: "setting",
      eventName: handleGoToEditor,
      icon: "i-ph-planet-duotone",
    },
    {
      title: "帮助文档",
      name: "helpDocs",
      eventName: handleHelpDocs,
      icon: "i-ph-book-open-text-duotone",
    },
    {
      title: "建议反馈",
      name: "feedback",
      eventName: handleFeedback,
      icon: "i-ph-hands-praying-duotone",
    },
    {
      title: "主题切换",
      name: "changeTheme",
      eventName: toggleDarkMode,
      icon: isDarkMode.value ? "i-ph-moon" : "i-ph-sun",
    },
    {
      title: "登出",
      name: "logout",
      eventName: handleLogout,
      icon: "i-ph-sign-out",
    },
  ];
});

function handleHelpDocs() {
  open.value = false;
  window.open(runtimeConfig.public.helpDocsURL, "_blank");
}

function handleFeedback() {
  open.value = false;
  window.open("https://txc.qq.com/products/652508", "_blank");
}

function handleSetting() {
  open.value = false;
  navigateTo("/user/setting");
}

function handleLogout() {
  open.value = false;
  emit("logout", true);
}

function handleGoToEditor() {
  open.value = false;
  window.open("https://earthworm-editor.cuixueshe.com", "_blank");
}
</script>

<style scoped></style>
