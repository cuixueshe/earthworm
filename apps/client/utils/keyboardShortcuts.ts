import { convertMacKey } from "~/composables/user/shortcutKey";

// 添加全局快捷键
interface Shortcut {
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

function createShortcut(key: string, command: Shortcut["command"]): Shortcut {
  return {
    ...parseKey(key),
    command,
  };
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

function parseKey(keyString: string) {
  const keys = keyString.toLowerCase().split("+");

  const result = {
    key: keys[keys.length - 1], // 取数组最后一个元素作为 key
    ctrlKey: keys.includes("ctrl"),
    metaKey: keys.includes("command"),
  };

  return result;
}

export function registerShortcut(key: string, command: Shortcut["command"]) {
  const shortcut = createShortcut(key, command);
  shortcuts.push(shortcut);
  return shortcut;
}

export function cancelShortcut(key: string, command: Function): void;
export function cancelShortcut(shortcut: Shortcut): void;
export function cancelShortcut(
  keyOrShortcut: string | Shortcut,
  command?: Function
) {
  if (typeof keyOrShortcut === "string") {
    const matchingShortcut = shortcuts.find((shortcut) => {
      return shortcut.key === keyOrShortcut && shortcut.command === command;
    });

    if (matchingShortcut) {
      const index = shortcuts.indexOf(matchingShortcut);
      shortcuts.splice(index, 1);
    }
  } else {
    const index = shortcuts.indexOf(keyOrShortcut);
    if (index !== -1) {
      shortcuts.splice(index, 1);
    }
  }
}

export function cleanAllShortcut() {
  shortcuts.length = 0;
}
