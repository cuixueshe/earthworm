<template>
  <div class="w-full">
    <div
      class="flex items-center justify-between text-gray-900 title dark:text-gray-300"
    >
      成就中心
      <button
        class="btn btn-primary mt-5"
        @click="handleOpenDialog"
      >
        颁发成就
      </button>
    </div>

    <div class="flex flex-wrap gap-5">
      <AchievementCard
        v-for="achievement in achievementList"
        :key="achievement.id"
        class="cursor-pointer"
        isShowCheckBox
        :achievement="achievement"
      />
    </div>
  </div>
  <dialog
    class="modal"
    :open="isShowModal"
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
              class="badge dark:bg-gray-700 badge-outline"
              v-for="i in checkedAchievement"
            >
              {{ i.name }}
            </div>
          </div>
        </div>

        <FormInput
          label="授权指令"
          name="secretKey"
          placeholder="请输入授权指令"
          v-model="secretKey"
          :errorMessage="secretKeyError"
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
              @click="handleCancel"
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
import { onMounted } from "vue";
import { fetchAuthUser } from "~/api/achievement";
import Message from "~/components/main/Message/useMessage";
import AchievementCard from "~/components/user/AchievementCard.vue";
import { useAchievementList } from "~/composables/user/achievement";
import FormInput from "~/pages/Auth/FormInput.vue";
import { useAwardForm } from "./hooks/useAwardForm";
const {
  handleSubmit,
  phone,
  phoneError,
  secretKey,
  secretKeyError,
  resetForm,
} = useAwardForm();
const {
  achievementList,
  getAchievementList,
  awardAchievement,
  checkedAchievement,
  getAchievementChecked,
  isShowModal,
  handleShowModal,
  handleHideModal,
} = useAchievementList();

function handleCancel() {
  handleHideModal();
  resetForm();
}
function handleOpenDialog() {
  getAchievementChecked();
  if (checkedAchievement.value.length > 0) {
    handleShowModal();
  } else {
    Message.warning("请先选择成就", { duration: 1200 });
  }
}

const handleAward = handleSubmit(async (values) => {
  async function getUserID() {
    return await fetchAuthUser({
      phone: phone.value,
    });
  }
  const userInfo = await getUserID();

  const choiceAchievement = checkedAchievement.value.map((x) => x.id);
  const p = {
    secretKey: values.secretKey,
    userID: userInfo.id,
    choiceAchievement,
  };

  await awardAchievement({ ...p });
  Message.success("颁发成功");
  handleCancel();
});
onMounted(() => {
  getAchievementList();
});
</script>
<style scoped>
.title {
  height: 32px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
}
</style>
