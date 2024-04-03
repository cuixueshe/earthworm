<template>
  <div class="w-full">
    <div
      class="flex items-center justify-between text-gray-900 title dark:text-gray-300"
    >
      成就中心
      <button
        class="btn btn-primary"
        @click="handleShowModal"
      >
        颁发成就
      </button>
    </div>

    <div class="flex flex-wrap gap-5">
      <AchievementCard
        v-for="a in _achievementList"
        :key="a.id"
        class="cursor-pointer"
        isShowCheckBox
        :achievement="a"
        @toggleChooseAchievement="toggleChooseAchievement"
      />
    </div>
  </div>
  <dialog
    class="modal"
    :open="isShow"
  >
    <div class="modal-box">
      <h3 class="mb-2 text-lg font-bold">颁发成就</h3>
      <form
        @submit.prevent="handleAward"
        class="space-y-6"
        novalidate
      >
        <div>
          <label
            class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            成就名称
          </label>
          <div class="flex gap-2 mt-2">
            <div
              class="badge badge-ghost"
              v-for="i in chooseAchievement"
            >
              {{ i.name }}
            </div>
          </div>
        </div>

        <FormInput
          label="授权口令"
          name="authentication"
          placeholder="请输入授权口令"
          v-model="authentication"
          :errorMessage="authenticationError"
        />
        <FormInput
          label="用户手机号"
          name="phone"
          placeholder="请输入用户手机号"
          v-model="phone"
          :errorMessage="phoneError"
        />
        <!-- <p class="text-xs text-opacity-80">抱歉，没有找到该用户~</p> -->
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn"
              @click="handleHideModal"
            >
              取消
            </button>
          </form>

          <button
            class="btn btn-primary"
            type="submit"
          >
            确定
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AchievementCard from "~/components/user/AchievementCard.vue";
import type { AchievementItem } from "~/composables/user/achievement";
import FormInput from "~/pages/Auth/FormInput.vue";
import { useAwardForm } from "./hooks/useAwardForm";
const { handleSubmit, phone, phoneError, authentication, authenticationError } =
  useAwardForm();
const chooseAchievement = ref<AchievementItem[]>([]);
function useShowModal() {
  const isShow = ref(false);

  const handleShowModal = () => {
    isShow.value = true;
  };
  const handleHideModal = () => {
    isShow.value = false;
  };
  return { isShow, handleShowModal, handleHideModal };
}
const { isShow, handleShowModal, handleHideModal } = useShowModal();
const idList = ref([]);
const toggleChooseAchievement = (item: AchievementItem) => {
  chooseAchievement.value.push(item);
};

const handleAward = handleSubmit(async (values) => {});
const _achievementList: AchievementItem[] = [
  {
    id: 1,
    name: "成就名1",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    desc: "刷课刷得停不下来",
  },
  {
    id: 2,
    name: "成就名2",
    avatar: "https://avatars.githubusercontent.com/u/2?v=5",
    desc: "刷课刷得最多的人",
  },
  {
    id: 3,
    name: "成就名3",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    desc: "刷课刷得最速度的同学",
  },
  {
    id: 4,
    name: "成就名4",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    desc: "刷课刷得最慢的同学",
  },
  {
    id: 5,
    name: "成就名5",
    avatar: "https://avatars.githubusercontent.com/u/7?v=4",
    desc: "提了很多issue的同学",
  },
  {
    id: 6,
    name: "成就名6",
    avatar: "https://avatars.githubusercontent.com/u/8?v=4",
    desc: "提了很多pr的同学",
  },
];
</script>
<style scoped>
.title {
  height: 32px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
}
</style>
