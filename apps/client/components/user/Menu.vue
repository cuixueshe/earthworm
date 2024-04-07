<template>
  <div class="w-24 border-r border-solid border-gray-200">
    <div
      v-for="(menu, index) in menus"
      :key="index"
      class="box-content h-8 leading-8 py-2 cursor-pointer"
      :class="
        currentMenu === menu.name
          ? 'border-r-2 border-solid border-r-fuchsia-500 text-fuchsia-500'
          : ''
      "
      @click="handleChangeMenu(menu)"
    >
      {{ menu.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type Menu = {
  name: string;
  component: string;
};

const props = defineProps<{
  menus: Menu[];
  defaultMenuName: string;
}>();

const emits = defineEmits(["changeMenu"]);

const currentMenu = ref(props.defaultMenuName);

function handleChangeMenu(menu: Menu) {
  currentMenu.value = menu.name;
  emits("changeMenu", menu);
}

watch(
  () => props.defaultMenuName,
  (newVal) => {
    currentMenu.value = newVal;
  },
  { immediate: true }
);
</script>
