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
  const getAchievementList = async () => {
    // const res = await UserAchievement.getAchievementList();
    // achievementList.value = res.data;
  };
  const setAchievementActive = async (id: number) => {
    // const res = await UserAchievement.setAchievementActive(id);
    // if (res.code === 200) {
    //   achievementList.value = achievementList.value.map((item) => {
    //     if (item.id === id) {
    //       item.isActive = true;
    //     }
    //     return item;
    //   });
    // }
  };
  return {
    achievementList,
    getAchievementList,
    setAchievementActive,
  };
};
