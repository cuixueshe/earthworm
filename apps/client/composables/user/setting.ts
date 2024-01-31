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

let shortcutKeyData = ref<{ [key: string]: any }>({
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
  function setShortcutKeyData() {
    const localKeys = localStorage.getItem("shortcutKeys");
    if (localKeys) shortcutKeyData.value = JSON.parse(localKeys);
  }
  onMounted(() => setShortcutKeyData());

  function saveShortcutKeys() {
    shortcutKeyData.value[currentKeyType.value] = shortcutKeyStr.value.trim();
    localStorage.setItem("shortcutKeys", JSON.stringify(shortcutKeyData.value));

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
   * 有待讨论，产品角度出发，快捷键应该只支持组合键形式，单键组合在使用过程中不方便写单词
   */
  function handleKeyup(e: KeyboardEvent) {
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
    shortcutKeyStr,
    shortcutKeyTip,
    handleKeyup,
    shortcutKeyData,
  };
}
