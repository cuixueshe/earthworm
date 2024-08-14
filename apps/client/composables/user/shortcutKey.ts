import { computed, ref } from "vue";

export enum SHORTCUT_KEY_TYPES {
  SOUND = "sound",
  ANSWER = "answer",
  SKIP = "skip",
  PREVIOUS = "previous",
  MASTERED = "mastered",
  PAUSE = "pause",
}
export const SHORTCUT_KEYS = "shortcutKeys";
export const DEFAULT_SHORTCUT_KEYS = {
  sound: "Ctrl+'",
  answer: "Ctrl+;",
  skip: "Ctrl+.",
  previous: "Ctrl+,",
  mastered: "Ctrl+m",
  pause: "Ctrl+p",
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

export function parseShortcut(shortcut: string): string[] {
  return shortcut
    .split("+")
    .map((key) => key.trim().charAt(0).toUpperCase() + key.slice(1).toLowerCase());
}

// 自定义快捷键
const showModal = ref<boolean>(false);
const currentKeyType = ref<SHORTCUT_KEY_TYPES | "">("");
const shortcutKeyStr = ref<string>("");
const shortcutKeys = ref<{ [key: string]: any }>({
  ...DEFAULT_SHORTCUT_KEYS,
});
const hasSameShortcutKey = ref(false);
const shortcutKeyTip = computed(() => {
  return shortcutKeyStr.value.replace(/\+/g, "+");
});

// 初始化快捷键
setShortcutKeys();

function setShortcutKeys() {
  const localKeys = localStorage.getItem(SHORTCUT_KEYS);
  if (localKeys) {
    shortcutKeys.value = { ...shortcutKeys.value, ...JSON.parse(localKeys) };
  } else {
    localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(shortcutKeys.value));
  }
}

export function useShortcutKeyMode() {
  function handleEdit(type: SHORTCUT_KEY_TYPES) {
    showModal.value = true;
    shortcutKeyStr.value = "";
    currentKeyType.value = type;
  }

  function handleCloseDialog() {
    showModal.value = false;
    hasSameShortcutKey.value = false;
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

  function checkSameShortcutKey(key: string) {
    const keys = Object.values(shortcutKeys.value);
    const currentShortcutKey = shortcutKeys.value[currentKeyType.value];
    return keys.some((x) => x === key && x !== currentShortcutKey);
  }
  /**
   * 参考于 VSCode 快捷键
   * 有待讨论，产品角度出发，快捷键应该只支持组合键形式
   * 单键组合在使用过程中不方便写单词
   */

  function handleKeydown(e: KeyboardEvent) {
    if (!showModal.value) return;

    e.preventDefault();

    if (e.key === "Escape") {
      handleCloseDialog();
      return;
    }

    const mainKey = getKeyModifier(e);
    if (!mainKey && isEnterKey(e.key)) {
      if (checkSameShortcutKey(shortcutKeyStr.value)) {
        hasSameShortcutKey.value = true;
      } else {
        saveShortcutKeys();
        handleCloseDialog();
      }
      return;
    }

    const key = convertMacKey(e.key);
    if (SPECIAL_KEYS.has(e.key) || !mainKey) {
      // 单键
      shortcutKeyStr.value = key;
    } else {
      // 组合键
      shortcutKeyStr.value = `${mainKey}+${key}`;
    }
  }

  function reset() {
    showModal.value = false;
    currentKeyType.value = "";
    shortcutKeyStr.value = "";
    shortcutKeys.value = { ...DEFAULT_SHORTCUT_KEYS };
    hasSameShortcutKey.value = false;
    localStorage.removeItem(SHORTCUT_KEYS);
  }

  return {
    showModal, // 弹框对象
    shortcutKeys, // 快捷键对象
    shortcutKeyStr, // 单个修改的快捷键
    shortcutKeyTip, // 快捷键输入框底部注释
    hasSameShortcutKey, // 是否有相同的快捷键
    setShortcutKeys,
    handleKeydown,
    handleEdit,
    handleCloseDialog,
    reset,
  };
}
