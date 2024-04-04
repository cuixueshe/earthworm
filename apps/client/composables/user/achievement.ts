import { ref } from "vue";
import { fetchAllAchievements, fetchPubAchievement } from "~/api/achievement";
export interface AchievementItem {
  id: number;
  name: string;
  description: string;
  avatar: string;
  achieved?: boolean;
  createdAt?: string;
  isActive?: boolean;
  isChecked?: boolean;
}

/** 成就模块处理逻辑
 *  achievementList: 当前用户成就列表
 *  checkedAchievement: 选中的成就
 *  getAchievementList: 获取当前用户的所有的成就列表
 *  setAchievementActive: 设置成就为使用中状态
 */

export const useAchievementList = () => {
  const achievementList = ref<AchievementItem[]>([]);
  const currentAchievement = ref<AchievementItem>();
  const checkedAchievement = ref<AchievementItem[]>([])
  const getAchievementList = async () => {
    achievementList.value = await fetchAllAchievements();
  };
  const setAchievementActive = async (id: number) => {
    currentAchievement.value = achievementList.value.find(
      (item) => item.id === id
    );
    currentAchievement.value!.isActive = true;
  };
  const getAchievementChecked = () =>{
    checkedAchievement.value = achievementList.value.filter(x => x.isChecked)
  }
  async function awardAchievement (data:any){
    await fetchPubAchievement(data);
  }
  return {
    currentAchievement,
    achievementList,
    checkedAchievement,
    getAchievementList,
    setAchievementActive,
    getAchievementChecked,
    awardAchievement
  };
};
