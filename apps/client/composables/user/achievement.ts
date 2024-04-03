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
 *  checkedAchievement: 选中的成就
 *  getAchievementList: 获取当前用户的所有的成就列表
 *  setAchievementActive: 设置成就为使用中状态
 */
const _achievementList: AchievementItem[] = [
  {
    id: 1,
    name: "成就名1",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    desc: "刷课刷得停不下来",
  },
  {
    id: 2,
    name: "成就名2",
    avatar: "https://avatars.githubusercontent.com/u/2?v=5",
    desc: "刷课刷得最多的人",
  },
  {
    id: 3,
    name: "成就名3",
    avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    desc: "刷课刷得最速度的同学",
  },
  {
    id: 4,
    name: "成就名4",
    avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    desc: "刷课刷得最慢的同学",
  },
  {
    id: 5,
    name: "成就名5",
    avatar: "https://avatars.githubusercontent.com/u/7?v=4",
    desc: "提了很多issue的同学",
  },
  {
    id: 6,
    name: "成就名6",
    avatar: "https://avatars.githubusercontent.com/u/8?v=4",
    desc: "提了很多pr的同学",
  },
];
export const useAchievementList = () => {
  const achievementList = ref<AchievementItem[]>([]);
  const currentAchievement = ref<AchievementItem>();
  const checkedAchievement = ref<AchievementItem[]>([])
  const getAchievementList = async () => {
    achievementList.value = _achievementList
    // const res = await UserAchievement.getAchievementList();
    // achievementList.value = res.data;
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
  return {
    currentAchievement,
    achievementList,
    checkedAchievement,
    getAchievementList,
    setAchievementActive,
    getAchievementChecked
  };
};
