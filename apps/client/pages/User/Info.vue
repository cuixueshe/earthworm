<template>
  <div class="flex justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
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
import { markRaw, ref } from "vue";
import UserAchievement from "~/components/user/Achievement.vue";
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
  { name: "我的成就", component: markRaw(UserAchievement) },
]);
let currentComponent = ref<any>();
const handleChangeMenu = (menu: Menu) => {
  currentComponent.value = menu.component;
};
</script>
