<template>
  <div class="w-full">
    <div
      class="flex items-center justify-between text-gray-900 title dark:text-gray-300"
    >
      成就中心
      <button
        class="btn btn-primary"
        @click="handleOpenDialog"
      >
        颁发成就
      </button>
    </div>

    <div class="flex flex-wrap gap-5">
      <AchievementCard
        v-for="a in achievementList"
        :key="a.id"
        class="cursor-pointer"
        isShowCheckBox
        :achievement="a"
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
              v-for="i in checkedAchievement"
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
import { onMounted, ref } from "vue";
import Message from "~/components/main/Message/useMessage";
import AchievementCard from "~/components/user/AchievementCard.vue";
import { useAchievementList } from "~/composables/user/achievement";
import FormInput from "~/pages/Auth/FormInput.vue";
import { useAwardForm } from "./hooks/useAwardForm";
const { handleSubmit, phone, phoneError, authentication, authenticationError } =
  useAwardForm();
const {achievementList, getAchievementList,checkedAchievement,getAchievementChecked} = useAchievementList()

function handleOpenDialog(){
  getAchievementChecked()
  if(checkedAchievement.value.length > 0){
    handleShowModal()
  }else{
    Message.warning("请先选择成就", { duration: 1200 });
  }
}
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


const handleAward = handleSubmit(async (values) => {});
onMounted(()=>{
  getAchievementList()
})
</script>
<style scoped>
.title {
  height: 32px;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 40px;
}
</style>
