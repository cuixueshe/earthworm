import { ref, computed } from "vue";
import { DEFAULT_SHORTCUT_KEYS } from "~/store/user";

export const SHORTCUT_KEYS = "shortcutKeys";
export const KEYBOARD = {
  ESC: "Esc",
  ALT: "Alt",
  CTRL: "Ctrl",
  META: "Meta",
  SHIFT: "Shift",
  ENTER: "Enter",
  COMMAND: "Command",
  CONTROL: "Control",
};
export const SPECIAL_KEYS = new Map([
  [KEYBOARD.ALT, true],
  [KEYBOARD.CTRL, true],
  [KEYBOARD.CONTROL, true],
  [KEYBOARD.SHIFT, true],
  [KEYBOARD.META, true],
  [KEYBOARD.COMMAND, true],
]);

// 对于 Mac 特殊修饰键 Control 和 Meta 键转换处理
// Control → Ctrl
// Meta → Command
// 其他键照旧返回
export function convertMacKey(key: string) {
  return (
    {
      [KEYBOARD.CONTROL]: KEYBOARD.CTRL,
      [KEYBOARD.META]: KEYBOARD.COMMAND,
    }[key] || key
  );
}

// 自定义快捷键
export function useShortcutKeyMode() {
  const showModal = ref<boolean>(false);
  const currentKeyType = ref<string>("");
  const shortcutKeyStr = ref<string>("");
  const shortcutKeys = ref<{ [key: string]: any }>({
    ...DEFAULT_SHORTCUT_KEYS,
  });
  const shortcutKeyTip = computed(() => {
    return shortcutKeyStr.value.replace(/\+/g, " 加上 ");
  });

  // 初始化快捷键
  setShortcutKeys();

  function setShortcutKeys() {
    const localKeys = localStorage.getItem(SHORTCUT_KEYS);
    if (localKeys) {
      shortcutKeys.value = JSON.parse(localKeys);
    } else {
      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(shortcutKeys.value));
    }
  }

  function handleEdit(type: string) {
    showModal.value = true;
    shortcutKeyStr.value = "";
    currentKeyType.value = type;
  }

  function handleCloseDialog() {
    showModal.value = false;
  }

  function getKeyModifier(e: KeyboardEvent) {
    if (e.altKey) return KEYBOARD.ALT;
    if (e.shiftKey) return KEYBOARD.SHIFT;
    if (e.ctrlKey) return KEYBOARD.CTRL;
    if (e.metaKey) return KEYBOARD.COMMAND;
    return "";
  }

  function saveShortcutKeys() {
    const trimmedShortcutKeyStr = shortcutKeyStr.value.trim();
    if (trimmedShortcutKeyStr) {
      shortcutKeys.value[currentKeyType.value] = trimmedShortcutKeyStr;
      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(shortcutKeys.value));
    }
  }

  function isEnterKey(key: string) {
    return key === KEYBOARD.ENTER;
  }

  /**
   * 参考于 VSCode 快捷键
   * 有待讨论，产品角度出发，快捷键应该只支持组合键形式
   * 单键组合在使用过程中不方便写单词
   */

  function handleKeydown(e: KeyboardEvent) {
    if (!showModal.value) return;

    e.preventDefault();
    const mainKey = getKeyModifier(e);
    if (!mainKey && isEnterKey(e.key)) {
      saveShortcutKeys();
      handleCloseDialog();
      return;
    }

    const key = convertMacKey(e.key);
    // TODO: 需要校验当前快捷键是否与其他快捷键重复，重复则不允许设置
    if (SPECIAL_KEYS.has(e.key) || !mainKey) {
      // 单键
      shortcutKeyStr.value = key;
    } else {
      // 组合键
      shortcutKeyStr.value = `${mainKey}+${key}`;
    }
  }

  return {
    showModal, // 弹框对象
    shortcutKeys, // 快捷键对象
    shortcutKeyStr, // 单个修改的快捷键
    shortcutKeyTip, // 快捷键输入框底部注释
    setShortcutKeys,
    handleKeydown,
    handleEdit,
    handleCloseDialog,
  };
}
