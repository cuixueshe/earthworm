import { ref } from "vue";

const isUserMenuOpen = ref(false);
export function useUserMenu() {
  const openUserMenu = () => {
    isUserMenuOpen.value = true;
  };

  const closeUserMenu = () => {
    isUserMenuOpen.value = false;
  };

  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  };

  return {
    isUserMenuOpen,
    openUserMenu,
    closeUserMenu,
    toggleUserMenu,
  };
}
