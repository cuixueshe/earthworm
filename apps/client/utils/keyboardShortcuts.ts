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
  const shortcuts = findMatchingShortcut(e);

  shortcuts.forEach((shortcut) => {
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
  let cancelledShortcut: Shortcut;
  if (typeof keyOrShortcut === "string" && command) {
    // 字符串形式的快捷键需要手动创建 shortcut 对象
    cancelledShortcut = createShortcut(keyOrShortcut, command);
  } else {
    cancelledShortcut = keyOrShortcut as Shortcut;
  }

  const index = shortcuts.findIndex(({ key, command, ctrlKey, metaKey }) => {
    // 精准匹配对应快捷键对象
    return (
      key === cancelledShortcut.key &&
      ctrlKey === cancelledShortcut.ctrlKey &&
      metaKey === cancelledShortcut.metaKey &&
      command === cancelledShortcut.command
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
