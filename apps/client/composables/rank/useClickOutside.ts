import { onBeforeUnmount, onMounted, type Ref } from "vue";

export function useClickOutside(
  refElement: Ref<HTMLElement | null>,
  callback: () => void
) {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!refElement.value?.contains(target)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside, true);
  });
}
