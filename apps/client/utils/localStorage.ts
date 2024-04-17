import { ref } from "vue";

// 封装个通用 hook 来处理 localStorage boolean
export function useLocalStorageBoolean(
  key: string,
  // 默认开启
  defaultValue: any,
) {
  const valueRef = ref(defaultValue);

  function loadCache() {
    const storedValue = localStorage.getItem(key);
    // 如果 localStorage 中有值，则使用该值
    if (storedValue !== null) {
      // 检测值是否为 'true' 或 'false'
      // 若是，则转为 boolean 类型，否则按字符串处理
      if (storedValue === "true" || storedValue === "false") {
        valueRef.value = storedValue === "true";
      } else {
        valueRef.value = storedValue;
      }
    }
    update(valueRef.value);
  }

  function update(value: string | boolean) {
    valueRef.value = value;
    if (typeof value === "boolean") {
      localStorage.setItem(key, String(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  function remove() {
    localStorage.removeItem(key);
  }

  function toggle() {
    if (typeof valueRef.value === "boolean") {
      update(!valueRef.value);
    } else {
      update(valueRef.value);
    }
  }

  function isTrue(): boolean {
    return valueRef.value === true || valueRef.value === "true";
  }

  loadCache();

  return {
    value: valueRef,
    remove,
    toggle,
    isTrue,
  };
}
