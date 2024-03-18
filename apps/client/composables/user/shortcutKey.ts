import { ref, onMounted, computed } from "vue";
import { DEFAULT_SHORTCUT_KEYS } from "~/store/user";

export const KEYBOARD = {
  ENTER: "Enter",
  COMMAND: "Command",
  CONTROL: "Control",
  ALT: "Alt",
  SHIFT: "Shift",
  ESC: "Esc",
  META: "Meta",
  CTRL: "Ctrl",
};
export const SHORTCUT_KEYS = "shortcutKeys";

let showModal = ref<boolean>(false);
let currentKeyType = ref<string>("");

export function useShortcutDialogMode() {
  function handleEdit(type: string) {
    showModal.value = true;
    currentKeyType.value = type;
  }

  function handleCloseDialog() {
    showModal.value = false;
    shortcutKeyStr.value = "";
  }
  return {
    showModal,
    handleEdit,
    handleCloseDialog,
  };
}

let shortcutKeys = ref<{ [key: string]: any }>({
  ...DEFAULT_SHORTCUT_KEYS,
});
let shortcutKeyStr = ref<string>("");
const SPECIAL_KEYS = new Map([
  ["Alt", "Alt"],
  ["Shift", "Shift"],
  ["Ctrl", "Ctrl"],
  ["Command", "Command"],
]);

export function useShortcutKeyMode() {
  setShortcutKeys();

  function setShortcutKeys() {
    const localKeys = localStorage.getItem(SHORTCUT_KEYS);
    if (localKeys) {
      shortcutKeys.value = JSON.parse(localKeys);
    } else {
      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(shortcutKeys.value));
    }
  }

  function saveShortcutKeys() {
    const trimmedShortcutKeyStr = shortcutKeyStr.value.trim();
    if (trimmedShortcutKeyStr) {
      shortcutKeys.value[currentKeyType.value] = trimmedShortcutKeyStr;
      localStorage.setItem(SHORTCUT_KEYS, JSON.stringify(shortcutKeys.value));
    }
    const { handleCloseDialog } = useShortcutDialogMode();
    handleCloseDialog();
  }
  const shortcutKeyTip = computed(() => {
    return shortcutKeyStr.value.trim().replace(/\s/g, " 加上 ");
  });

  function convertKey(key: string) {
    return (
      {
        [KEYBOARD.CONTROL]: KEYBOARD.CTRL,
        [KEYBOARD.META]: KEYBOARD.COMMAND,
      }[key] || key
    );
  }
  const isEnterKey = (key: string) => key === KEYBOARD.ENTER;
  /**
   * 参考于vscode快捷键
   * 有待讨论，产品角度出发，快捷键应该只支持组合键形式
   * 单键组合在使用过程中不方便写单词
   */
  function handleKeydown(e: KeyboardEvent) {
    e.preventDefault();
    if (!showModal.value) return;
    isEnterKey(e.key) && saveShortcutKeys();
    // 组合键
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      const mainKey =
        (e.altKey && KEYBOARD.ALT) ||
        (e.shiftKey && KEYBOARD.SHIFT) ||
        (e.ctrlKey && KEYBOARD.CTRL) ||
        (e.metaKey && KEYBOARD.COMMAND);
      shortcutKeyStr.value = `${mainKey}+${e.key} `;
    } else {
      // 单个键入
      const key = convertKey(e.key);
      if (
        (shortcutKeyStr.value.includes(key) && SPECIAL_KEYS.has(key)) ||
        isEnterKey(e.key)
      )
        return;
      shortcutKeyStr.value = `${key} `;
    }
  }

  return {
    shortcutKeys, // 快捷键对象
    setShortcutKeys,
    shortcutKeyStr, // 单个修改的快捷键
    shortcutKeyTip, // 快捷键输入框底部注释
    handleKeydown,
  };
}
