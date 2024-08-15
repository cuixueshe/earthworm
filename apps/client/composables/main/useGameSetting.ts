import { ref } from "vue";

const showGameSettingModal = ref(false);

export const useGameSetting = () => {
  const toggleGameSettingModal = () => {
    showGameSettingModal.value = !showGameSettingModal.value;
  };

  const openGameSettingModal = () => {
    showGameSettingModal.value = true;
  };

  const closeGameSettingModal = () => {
    showGameSettingModal.value = false;
  };

  return {
    showGameSettingModal,
    toggleGameSettingModal,
    openGameSettingModal,
    closeGameSettingModal,
  };
};
