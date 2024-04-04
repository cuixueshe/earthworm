import { ref } from "vue";
import { fetchAllAchievements, fetchPubAchievement, fetchSetUsing, type SetDto } from "~/api/achievement";
import Message from "~/components/main/Message/useMessage";

export interface AchievementItem {
  id: number;
  name: string;
  description: string;
  avatar: string;
  achieved?: boolean;
  createdAt?: string;
  isActive?: boolean;
  isChecked?: boolean;
  hasAchievement?: boolean;
}

/** 成就模块处理逻辑
 *  achievementList: 当前用户成就列表
 *  checkedAchievement: 选中的成就
 *  getAchievementList: 获取当前用户的所有的成就列表
 *  setAchievementActive: 设置成就为使用中状态
 */

export const useAchievementList = () => {
  const isShowModal = ref(false);
  const achievementList = ref<AchievementItem[]>([]);
  const currentAchievement = ref<AchievementItem>();
  const checkedAchievement = ref<AchievementItem[]>([])

  function handleShowModal() {
    isShowModal.value = true;
  }
  function handleHideModal() {
    isShowModal.value = false;
  }
  const getAchievementList = async () => {
    achievementList.value = await fetchAllAchievements();
  };
  // 设置成就为使用中状态
  const setAchievementActive = async (data: SetDto) => {
    await fetchSetUsing(data);
    Message.success("设置成功");
    // currentAchievement.value = achievementList.value.find(
    //   (item) => item.id === id
    // );
    // currentAchievement.value!.isActive = true;
  };
  const getAchievementChecked = () =>{
    checkedAchievement.value = achievementList.value.filter(x => x.isChecked)
  }
  async function awardAchievement (data:any){
    await fetchPubAchievement(data);
  }
  return {
    isShowModal,
    currentAchievement,
    achievementList,
    checkedAchievement,
    getAchievementList,
    setAchievementActive,
    getAchievementChecked,
    awardAchievement,
    handleShowModal,
    handleHideModal,
  };
};
