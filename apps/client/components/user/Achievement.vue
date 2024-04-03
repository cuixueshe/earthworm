<template>
  <div class="flex flex-wrap gap-5">
    <AchievementCard
      v-for="a in _achievementList"
      :key="a.id"
      :achievement="a"
      @click="handleClick(a)"
    />
  </div>
  <dialog
    id="my_modal_1"
    class="modal"
    :open="isShowModal"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold">提示</h3>
      <p class="py-4">要将"{{ name }}"设为当前使用吗？</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            class="btn"
            @click="handleHideModal"
          >
            取消
          </button>
        </form>
        <button
          class="btn btn-primary"
          @click="handleConfirm"
        >
          确定
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AchievementCard from "~/components/user/AchievementCard.vue";
import { useAchievementList } from "~/composables/user/achievement";
const { achievementList, setAchievementActive } = useAchievementList();
const name = ref("");
const currentItem = ref();
function handleClick(a: any) {
  isShowModal.value = true;
  name.value = a.name;
  currentItem.value = a;
}
function handleConfirm() {
  isShowModal.value = false;
  setAchievementActive(currentItem.value.id);
}
function handleHideModal() {
  isShowModal.value = false;
}
const isShowModal = ref(false);
const _achievementList = [
  {
    id: 1,
    name: "成就名1",
    createdAt: "2021-10-10",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    isActive: true,
    desc: "刷课刷得停不下来",
  },
  {
    id: 2,
    name: "成就名2",
    createdAt: "2021-10-10",
    avatar: "https://avatars.githubusercontent.com/u/2?v=5",
    isActive: false,
    desc: "刷课刷得最多的人",
  },
  {
    id: 3,
    name: "成就名3",
    createdAt: "2021-10-10",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    isActive: false,
    desc: "刷课刷得最速度的同学",
  },
  {
    id: 4,
    name: "成就名4",
    createdAt: "2021-10-10",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    isActive: false,
    desc: "刷课刷得最慢的同学",
  },
  {
    id: 5,
    name: "成就名5",
    createdAt: "2021-10-10",
    avatar: "https://avatars.githubusercontent.com/u/7?v=4",
    isActive: false,
    desc: "提了很多issue的同学",
  },
];
</script>
