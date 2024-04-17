import { ref } from "vue";

import { fetchUsername } from "~/api/user";
import Message from "~/components/main/Message/useMessage";

export const useUsername = () => {
  const username = ref("");
  const isShowModal = ref(true);

  const initUsername = (email: string) => {
    if (!email) return;
    username.value = email.split("@")[0];
  };
  function checkUsername() {
    if (!username.value) {
      Message.error("用户名不能为空");
      return false;
    }
    return true;
  }
  async function handleConfirm(callback: Function) {
    if (!checkUsername()) return;

    const res = await fetchUsername(username.value);
    if (typeof res === "boolean" && res) {
      Message.success("设置成功");
      isShowModal.value = false;
      callback();
    } else {
      Message.error(res!.message);
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
