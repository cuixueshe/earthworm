<template>
  <USlideover
    v-model="isUserMenuOpen"
    :ui="{ width: 'w-screen max-w-80' }"
  >
    <div class="flex h-full flex-col">
      <!-- 用户信息头部 -->
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-3">
          <div class="avatar">
            <div class="mask mask-squircle h-14 w-14">
              <UAvatar
                size="xl"
                :src="userStore.user?.avatar"
                alt="Avatar"
              />
            </div>
          </div>
          <div>
            <div class="flex gap-2">
              <div class="text-xl font-bold">{{ userStore.user?.username }}</div>
              <MembershipBadge></MembershipBadge>
            </div>
            <div class="text-sm opacity-75">{{ userStore.user?.name }}</div>
          </div>
        </div>

        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="closeUserMenu"
          tabindex="-1"
          :ui="{ color: { gray: { ghost: 'dark:hover:bg-gray-600' } } }"
        />
      </div>

      <!-- 菜单选项 -->
      <div class="flex-grow p-4">
        <button
          v-for="(item, index) in showMenuOptions"
          :key="item.name"
          @click="item.eventName"
          class="mb-2 flex w-full items-center rounded-lg p-1 transition-all duration-200 ease-in-out hover:bg-base-200 hover:shadow-md dark:hover:bg-gray-600"
          tabindex="-1"
        >
          <UIcon
            :name="item.icon"
            class="mr-3 h-7 w-7"
          ></UIcon>
          <span class="font-medium">{{ item.title }}</span>
        </button>
      </div>

      <!-- 底部信息 -->
      <div class="p-4 text-center text-xs opacity-50">版本 v1.0.0</div>
    </div>
  </USlideover>
</template>

<script setup lang="ts">
import { navigateTo, useModal } from "#imports";
import { useRuntimeConfig } from "nuxt/app";
import { computed } from "vue";

import Dialog from "~/components/common/Dialog.vue";
import { Theme, useDarkMode } from "~/composables/darkMode";
import { useUserMenu } from "~/composables/user/useUserMenu";
import { signOut } from "~/services/auth";
import { useUserStore } from "~/store/user";

const { isUserMenuOpen, closeUserMenu } = useUserMenu();
const { darkMode, toggleDarkMode } = useDarkMode();

const runtimeConfig = useRuntimeConfig();

const emit = defineEmits(["logout"]);
const open = defineModel("open");

const userStore = useUserStore();
const isDarkMode = computed(() => darkMode.value === Theme.DARK);
const modal = useModal();

const showMenuOptions = computed(() => {
  return [
    {
      title: "设置",
      name: "setting",
      eventName: handleSetting,
      icon: "i-ph-gear",
    },
    {
      title: "掌握列表",
      name: "setting",
      eventName: handleMasteredElements,
      icon: "i-ph-book",
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
  closeUserMenu();
  window.open(runtimeConfig.public.helpDocsURL, "_blank");
}

function handleFeedback() {
  closeUserMenu();
  window.open("https://txc.qq.com/products/652508", "_blank");
}

function handleMasteredElements() {
  closeUserMenu();
  navigateTo("/mastered-elements");
}

function handleSetting() {
  closeUserMenu();
  navigateTo("/user/setting");
}

function handleLogout() {
  closeUserMenu();

  modal.open(Dialog, {
    title: "退出登录",
    content: "是否确认退出登录？",
    showCancel: true,
    showConfirm: true,
    async onConfirm() {
      signOut();
    },
  });
}

function handleGoToEditor() {
  closeUserMenu();
  window.open("https://earthworm-editor.cuixueshe.com", "_blank");
}
</script>

<style scoped></style>
