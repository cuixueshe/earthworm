import { convertMacKey } from "~/composables/user/shortcutKey";

// 添加全局快捷键
export interface Shortcut {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  command: (keyboardEvent: KeyboardEvent) => void;
}

const shortcuts: Shortcut[] = [];

window.addEventListener("keydown", (e: KeyboardEvent) => {
  const matchingShortcuts = findMatchingShortcut(e);

  matchingShortcuts.forEach((shortcut) => {
    shortcut.command(e);
  });
});

function parseKey(keyString: string) {
  const keys = keyString.toLowerCase().split("+");

  const result = {
    key: keys[keys.length - 1], // 取数组最后一个元素作为 key
    ctrlKey: keys.includes("ctrl"),
    metaKey: keys.includes("command"),
  };

  return result;
}

function findMatchingShortcut(event: KeyboardEvent): Shortcut[] {
  return shortcuts.filter((shortcut) => {
    return (
      shortcut.ctrlKey === event.ctrlKey &&
      shortcut.metaKey === event.metaKey &&
      shortcut.key === convertMacKey(event.key).toLowerCase()
    );
  });
}

export function parseShortcutKeys(
  shortcutKeys: string,
  separator: string = "+"
) {
  // 如果只有一个字符的 key，将其转换为大写显示
  return shortcutKeys
    .split(separator)
    .map((key) => (key.length === 1 ? key.toUpperCase() : key));
}

export function createShortcut(
  key: string,
  command: Shortcut["command"]
): Shortcut {
  return {
    ...parseKey(key),
    command,
  };
}

export function registerShortcut(key: string, command: Shortcut["command"]) {
  const shortcut = createShortcut(key, command);
  shortcuts.push(shortcut);
  return shortcut;
}

export function cancelShortcut(key: string, command: Shortcut["command"]): void;
export function cancelShortcut(shortcut: Shortcut): void;
export function cancelShortcut(
  keyOrShortcut: string | Shortcut,
  command?: Shortcut["command"]
) {
  function normalizeShortcut() {
    let normalShortcut: Shortcut;
    if (typeof keyOrShortcut === "string" && command) {
      normalShortcut = createShortcut(keyOrShortcut, command);
    } else {
      normalShortcut = keyOrShortcut as Shortcut;
    }

    return normalShortcut;
  }

  let normalShortcut = normalizeShortcut();

  const index = shortcuts.findIndex(({ key, command, ctrlKey, metaKey }) => {
    // 精准匹配对应快捷键对象
    return (
      key === normalShortcut.key &&
      ctrlKey === normalShortcut.ctrlKey &&
      metaKey === normalShortcut.metaKey &&
      command === normalShortcut.command
    );
  });

  if (index !== -1) {
    // 删除
    shortcuts.splice(index, 1);
  }
}

export function cleanAllShortcut() {
  shortcuts.length = 0;
}
