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
const USING_ACHIEVEMENT = "usingAchievement";
// TODO optimize
export async function showAchievementLogo() {
  const imgSrc = "/contributor.png";

  const { initUserAchievementList, userAchievementList } = useAchievement();
  // check if there is a using achievement
  const usingAchievement = getUsingAchievementStore();
  // if there is a using achievement, return it and show it
  if (Object.keys(usingAchievement).length) {
    return {
      isActive: true,
      achievementImg: usingAchievement.achievementImg || imgSrc,
    };
  } else {
    // if there is no using achievement, check if there is any achievement
    await initUserAchievementList();
    // if there is no achievement, don't show the logo
    if (userAchievementList.value.length === 0) {
      return {
        isActive: false,
        achievementImg: imgSrc,
      };
    }
    // if there is achievement, show the active one
    const curItem = userAchievementList.value.find((i) => i.isActive);
    return {
      isActive: curItem?.isActive,
      achievementImg: curItem?.achievementImg || imgSrc,
    };
  }
}

function setUsingAchievementStore(achievement: AchievementItem) {
  localStorage.setItem(USING_ACHIEVEMENT, JSON.stringify(achievement));
}
function getUsingAchievementStore() {
  // if there is no using achievement, return an empty object
  if (localStorage.getItem(USING_ACHIEVEMENT) === "undefined") {
    return {};
  } else {
    return JSON.parse(localStorage.getItem(USING_ACHIEVEMENT)!);
  }
}
function getUserID() {
  return JSON.parse(localStorage.getItem("userInfo")!)?.userId;
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
  const userAchievement = ref<AchievementItem>({
    name: "",
    id: 0,
    description: "",
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
    return firstItem;
  }
  // 初始化成就
  function initUsingAchievement() {
    const achievementID = getUsingAchievementStore()?.id;
    if (!achievementID) {
      const curItem = setUsingFirst();
      setUsingAchievementStore(curItem);
    } else {
      setAchievementBeActive(getUsingAchievementStore());
    }
  }
  async function setAchievementBeActive(achievement: AchievementItem) {
    achievement.isActive = true;
  }
  const getUserAchievementList = async () => {
    const userID = getUserID();
    userAchievementList.value = await fetchHaveAchievement({ userID });
  };
  async function initUserAchievementList() {
    await getUserAchievementList();
    userAchievementList.value.length && initUsingAchievement();
  }
  // 设置成就为使用中状态
  async function setAchievementActive() {
    const data = {
      userID: getUserID(),
      achievementID: userAchievement.value.id,
    };
    await fetchSetUsing(data);
    Message.success("设置成功");
    setUsingAchievementStore(userAchievement.value);
    userAchievementList.value.forEach((item) => (item.isActive = false));
    setAchievementBeActive(userAchievement.value);
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
