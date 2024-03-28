<template>
  <div class="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8">
    <UserMenus
      :menus="userMenus"
      @changeMenu="handleChangeMenu"
    />
    <div class="flex-1 pl-4">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { markRaw, ref, shallowRef } from "vue";
import UserHome from "~/components/user/Home.vue";
import UserMenus from "~/components/user/Menu.vue";
import UserSetting from "~/components/user/Setting.vue";

type Menu = {
  name: string;
  component: any;
};

// [Vue warn]: Vue received a Component that was made a reactive object.
// This can lead to unnecessary performance overhead and should be avoided
// by marking the component with `markRaw` or using `shallowRef` instead of `ref`.
const userMenus = ref<Menu[]>([
  { name: "主页", component: markRaw(UserHome) },
  { name: "设置", component: markRaw(UserSetting) },
]);
let currentComponent = shallowRef<any>();
const handleChangeMenu = (menu: Menu) => {
  currentComponent.value = menu.component;
};
</script>
