<template>
  <div class="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
    <UserMenus :menus="userMenus" @changeMenu="handleChangeMenu" />
    <div class="flex-1 pl-4">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserHome from "~/components/user/Home.vue";
import UserMenus from "~/components/user/Menu.vue";
import UserSetting from "~/components/user/Setting.vue";

type Menu = {
  name: string;
  component: any;
};

const userMenus = ref<Menu[]>([
  { name: "主页", component: UserHome },
  { name: "设置", component: UserSetting },
]);
let currentComponent = ref<any>();
const handleChangeMenu = (menu: Menu) => {
  currentComponent.value = menu.component;
};
</script>
