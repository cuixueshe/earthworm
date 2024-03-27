import { ref } from "vue";

// 封装个通用 hook 来处理 localStorage boolean
export function useLocalStorageBoolean(
  key: string,
  // 默认开启
  defaultValue: string | boolean
) {
  const valueRef = ref(defaultValue);

  function loadCache() {
    const storedValue = localStorage.getItem(key);
    // 如果 localStorage 中有值才进行校验，则使用该值
    if (storedValue !== null) {
      if (typeof defaultValue == "boolean") {
        valueRef.value = storedValue === "true";
      } else {
        valueRef.value = storedValue;
      }
    }
    update(valueRef.value);
  }

  function update(value: boolean | string) {
    valueRef.value = value;
    localStorage.setItem(key, String(value));
  }

  function remove() {
    localStorage.removeItem(key);
  }
  function changeKeyBoardSound(value: string) {
    update(value);
  }
  function toggle() {
    update(!valueRef.value);
  }

  function isTrue(): string | boolean {
    return valueRef.value;
  }

  loadCache();

  return {
    value: valueRef,
    remove,
    toggle,
    isTrue,
    update,
    changeKeyBoardSound,
  };
}
