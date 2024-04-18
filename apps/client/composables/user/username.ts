import { ref } from "vue";

import Message from "~/components/main/Message/useMessage";
import { useUserStore } from "~/store/user";

export const useUsername = () => {
  const username = ref("");
  const isShowModal = ref(true);
  const userStore = useUserStore();
  const userInfo = userStore.userInfo;
  const initUsername = () => {
    const email = userInfo?.email;
    if (!email) return;
    username.value = email.split("@").at(0)!;
  };
  function checkUsername() {
    const minLength = 2;
    const errorMessage = {
      empty: "用户名不能为空",
      minLength: `用户名至少输入 ${minLength} 个字符`,
    };

    if (!username.value) {
      Message.error(errorMessage.empty);
      return false;
    }

    if (username.value.length < minLength) {
      Message.error(errorMessage.minLength);
      return false;
    }
    return true;
  }
  async function handleConfirm(callback: Function) {
    if (!checkUsername()) return;
    const result = await userStore.updateUserInfo({
      ...userInfo!,
      name: username.value,
    });
    if (result) {
      Message.success("用户名更新成功");
      isShowModal.value = false;
      callback();
    }
  }

  return {
    username,
    isShowModal,
    handleConfirm,
    initUsername,
    checkUsername,
  };
};
