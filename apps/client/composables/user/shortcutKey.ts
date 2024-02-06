import { ref, onMounted, computed } from "vue";
import { DEFAULT_SHORTCUT_KEYS } from "~/store/user";

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

export const CUSTOM_SHORTCUT_KEY = "shortcutKeys";

type ShortcutKey = {
  sound: string;
  answer: string;
  [k: string]: any;
};

let shortcutKeys = ref<ShortcutKey>({
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
  function setShortcutKeys() {
    const localKeys = localStorage.getItem(CUSTOM_SHORTCUT_KEY);
    if (localKeys) {
      shortcutKeys.value = JSON.parse(localKeys);
    } else {
      localStorage.setItem(
        CUSTOM_SHORTCUT_KEY,
        JSON.stringify(shortcutKeys.value)
      );
    }
  }
  onMounted(() => setShortcutKeys());

  function saveShortcutKeys() {
    const trimmedShortcutKeyStr = shortcutKeyStr.value.trim();
    if (trimmedShortcutKeyStr) {
      shortcutKeys.value[currentKeyType.value] = trimmedShortcutKeyStr;
      localStorage.setItem(
        CUSTOM_SHORTCUT_KEY,
        JSON.stringify(shortcutKeys.value)
      );
    }
    const { handleCloseDialog } = useShortcutDialogMode();
    handleCloseDialog();
  }
  const shortcutKeyTip = computed(() => {
    return shortcutKeyStr.value.trim().replace(/\s/g, " 加上 ");
  });

  function convertCtrlKey(key: string) {
    return key === "Control" ? "Ctrl" : key;
  }

  /**
   * 参考于vscode快捷键
   * 有待讨论，产品角度出发，快捷键应该只支持组合键形式
   * 单键组合在使用过程中不方便写单词
   */
  function handleKeyup(e: KeyboardEvent) {
    if (!showModal.value) return;

    if (e.key === "Enter") {
      saveShortcutKeys();
    }
    // 组合键
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) {
      const mainKey =
        (e.altKey && "Alt") ||
        (e.shiftKey && "Shift") ||
        (e.ctrlKey && "Ctrl") ||
        (e.metaKey && "Command");
      shortcutKeyStr.value += `${mainKey}+${e.key} `;
    } else {
      // 单个键入
      const key = convertCtrlKey(e.key);
      if (
        (shortcutKeyStr.value.includes(key) && SPECIAL_KEYS.has(key)) ||
        e.key === "Enter"
      )
        return;
      shortcutKeyStr.value += `${key} `;
    }
  }

  return {
    shortcutKeys, // 快捷键对象
    setShortcutKeys,
    shortcutKeyStr, // 单个修改的快捷键
    shortcutKeyTip, // 快捷键输入框底部注释
    handleKeyup,
  };
}
