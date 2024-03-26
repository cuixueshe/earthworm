import { computed, ref } from "vue";

export const SHORTCUT_KEYS = "shortcutKeys";
export const DEFAULT_SHORTCUT_KEYS = {
  sound: "⌃Ctrl+'",
  answer: "⌃Ctrl+;",
};
export const KEYBOARD = {
  ESC: "Esc",
  ALT: "Alt",
  CTRL: "Ctrl",
  META: "Meta",
  SHIFT: "Shift",
  ENTER: "Enter",
  COMMAND: "Command",
  CONTROL: "Control",
  SPACE: "Space",
  TAB: "Tab",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
  CAPS_LOCK: "CapsLock",
  PAGE_UP: "PageUp",
  PAGE_DOWN: "PageDown",
};
export const SPECIAL_KEYS = new Map([
  [KEYBOARD.ALT, true],
  [KEYBOARD.CTRL, true],
  [KEYBOARD.CONTROL, true],
  [KEYBOARD.SHIFT, true],
  [KEYBOARD.META, true],
  [KEYBOARD.COMMAND, true],
]);

export const KEY_SYMBOL = {
  [KEYBOARD.ALT]: "⌥",
  [KEYBOARD.CTRL]: "⌃",
  [KEYBOARD.META]: "⌘",
  [KEYBOARD.SHIFT]: "⇧",
  [KEYBOARD.ENTER]: "⏎",
  [KEYBOARD.COMMAND]: "⌘",
  [KEYBOARD.CONTROL]: "⌃",
  [KEYBOARD.TAB]: "⇥",
  [KEYBOARD.SPACE]: "␣",
  [KEYBOARD.ARROW_LEFT]: "←",
  [KEYBOARD.ARROW_RIGHT]: "→",
  [KEYBOARD.ARROW_UP]: "↑",
  [KEYBOARD.ARROW_DOWN]: "↓",
  [KEYBOARD.BACKSPACE]: "⌫",
  [KEYBOARD.DELETE]: "⌦",
  [KEYBOARD.CAPS_LOCK]: "⇪",
  [KEYBOARD.PAGE_UP]: "⇞",
  [KEYBOARD.PAGE_DOWN]: "⇟",
};

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
  function getSymbol(key: string) {
    if (/^\s+$/.test(key)) {
      return KEY_SYMBOL[KEYBOARD.SPACE] + KEYBOARD.SPACE;
    }
    return KEY_SYMBOL[key] ? `${KEY_SYMBOL[key]}${key}` : key;
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
      shortcutKeyStr.value = getSymbol(key);
    } else {
      // 组合键
      const mainKeySymbol = getSymbol(mainKey);
      const keySymbol = getSymbol(key);
      shortcutKeyStr.value = `${mainKeySymbol}+${keySymbol}`;
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
