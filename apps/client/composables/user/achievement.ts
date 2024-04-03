import { ref } from "vue";
export interface AchievementItem {
  id: number;
  name: string;
  desc: string;
  avatar: string;
  achieved?: boolean;
  createdAt?: string;
  isActive?: boolean;
  isChecked?: boolean;
}

/** 成就模块处理逻辑
 *  achievementList: 当前用户成就列表
 *  getAchievementList: 获取当前用户的所有的成就列表
 *  setAchievementActive: 设置成就为使用中状态
 */

export const useAchievementList = () => {
  const achievementList = ref<AchievementItem[]>([]);
  const currentAchievement = ref<AchievementItem>();
  const getAchievementList = async () => {
    // const res = await UserAchievement.getAchievementList();
    // achievementList.value = res.data;
  };
  const setAchievementActive = async (id: number) => {
    currentAchievement.value = achievementList.value.find(
      (item) => item.id === id
    );
    currentAchievement.value!.isActive = true;
  };
  return {
    currentAchievement,
    achievementList,
    getAchievementList,
    setAchievementActive,
  };
};
