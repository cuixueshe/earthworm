import { ref } from "vue";
import {
  fetchAllAchievements,
  fetchAuthUser,
  fetchHaveAchievement,
  fetchPubAchievement,
  fetchSetUsing,
} from "~/api/achievement";
import Message from "~/components/main/Message/useMessage";

export interface AchievementItem {
  id: number;
  name: string;
  description: string;
  achievementImg?: string;
  achieved?: boolean;
  createdAt?: string;
  isActive?: boolean;
  isChecked?: boolean;
}
// TODO optimize
export async function showContributorLogo() {
  const { initUserAchievementList, userAchievementList } = useAchievement();
  await initUserAchievementList();
  if (userAchievementList.value.length === 0) {
    return {
      isShow: false,
      img: "/contributor.png",
    };
  }
  const curItem = userAchievementList.value.find((i) => i.isActive);
  return {
    isShow: curItem?.isActive,
    img: curItem?.achievementImg || "/contributor.png",
  };
}

function setUsingAchievementStore(achievementID: number) {
  localStorage.setItem("usingAchievementID", String(achievementID));
}
function getUsingAchievementStore() {
  const id = localStorage.getItem("usingAchievementID");
  if (id) {
    return Number(id);
  } else {
    return null;
  }
}
function getUserID() {
  return JSON.parse(localStorage.getItem("userInfo")!).userId;
}
/** 成就模块处理逻辑
 *  achievementList: 当前用户成就列表
 *  checkedAchievement: 选中的成就
 *  getAchievementList: 获取当前用户的所有的成就列表
 *  setAchievementActive: 设置成就为使用中状态
 *  userAchievementList: 当前用户的成就列表
 *  getUserAchievementList: 获取当前用户的成就列表
 *  handleAwardAchievement: 颁发成就
 */

export const useAchievement = () => {
  const isShowModal = ref(false);
  const achievementList = ref<AchievementItem[]>([]);
  const checkedAchievement = ref<AchievementItem[]>([]);
  const userAchievementList = ref<AchievementItem[]>([]);
  const currentUseAchievement = ref<AchievementItem>();
  const userAchievement = ref({
    name: "",
    id: 0,
  });
  function handleShowModal() {
    isShowModal.value = true;
  }
  function handleHideModal() {
    isShowModal.value = false;
  }
  function getCheckedAchievement() {
    checkedAchievement.value = achievementList.value.filter((x) => x.isChecked);
  }
  function handleOpenAwardDialog() {
    getCheckedAchievement();
    if (checkedAchievement.value.length > 0) {
      handleShowModal();
    } else {
      Message.warning("请先选择成就", { duration: 1200 });
    }
  }
  function handleCancel(cb: () => void) {
    handleHideModal();
    cb();
  }

  async function getAchievementList() {
    achievementList.value = await fetchAllAchievements();
  }
  function setUsingFirst() {
    const firstItem = userAchievementList.value[0];
    if (firstItem) {
      firstItem.isActive = true;
    }
  }
  // 初始化成就
  function initUsingAchievement() {
    const achievementID = getUsingAchievementStore();
    if (!achievementID) {
      setUsingFirst();
    } else {
      setAchievementBeActive(achievementID);
    }
  }
  async function setAchievementBeActive(achievementID: number) {
    currentUseAchievement.value = userAchievementList.value.find(
      (x) => x.id === achievementID
    );
    currentUseAchievement.value!.isActive = true;
  }
  const getUserAchievementList = async () => {
    const userID = getUserID();
    userAchievementList.value = await fetchHaveAchievement({ userID });
  };
  async function initUserAchievementList() {
    await getUserAchievementList();
    initUsingAchievement();
  }
  // 设置成就为使用中状态
  async function setAchievementActive() {
    const data = {
      userID: getUserID(),
      achievementID: userAchievement.value.id,
    };
    await fetchSetUsing(data);
    Message.success("设置成功");
    setUsingAchievementStore(userAchievement.value.id);
    userAchievementList.value.forEach((item) => (item.isActive = false));
    setAchievementBeActive(userAchievement.value.id);
  }

  function handleSetAchievementActive(achievement: AchievementItem) {
    userAchievement.value = { ...achievement };
    handleShowModal();
  }
  function handleChangeAchievementActive() {
    setAchievementActive();
    handleHideModal();
  }
  /** 重置颁布成就勾选状态 */
  function resetAchievementCheckedStatus() {
    achievementList.value.forEach((item) => (item.isChecked = false));
  }
  async function handleAwardAchievement(params: any) {
    const { phone, secretKey } = params;
    const userInfo = await fetchAuthUser({ phone });
    const checkedAchievementIds = checkedAchievement.value.map((x) => x.id);
    const p = {
      secretKey,
      userID: userInfo?.id,
      choiceAchievement: checkedAchievementIds,
    };
    await fetchPubAchievement(p);
    Message.success("颁发成功");
    resetAchievementCheckedStatus();
  }
  return {
    isShowModal,
    achievementList,
    checkedAchievement,
    userAchievement,
    userAchievementList,
    handleShowModal,
    handleHideModal,
    getAchievementList,
    handleOpenAwardDialog,
    handleCancel,
    handleAwardAchievement,
    handleChangeAchievementActive,
    handleSetAchievementActive,
    initUserAchievementList,
  };
};
