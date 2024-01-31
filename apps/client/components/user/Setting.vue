<template>
  <h2 class="pb-2">快捷键设置</h2>
  <n-table :bordered="false" :single-line="false">
    <thead>
      <tr>
        <th>命令</th>
        <th>键绑定</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>play sound</td>
        <td>{{ shortcutKeyData.sound }}</td>
        <td>
          <n-button text @click="handleEdit('sound')"> 编辑 </n-button>
        </td>
      </tr>
      <tr>
        <td>show answer</td>
        <td>{{ shortcutKeyData.answer }}</td>
        <td>
          <n-button text @click="handleEdit('answer')"> 编辑 </n-button>
        </td>
      </tr>
    </tbody>
  </n-table>

  <dialog class="modal mt-[-8vh]" :open="showModal">
    <div ref="dialogBoxRef" class="modal-box max-w-[48rem]">
      <h3 class="font-bold text-center mb-4">
        先按所需的组合键，再按 Enter 键。
      </h3>
      <div class="h-8 leading-8 border border-solid border-fuchsia-500 rounded text-center">
        {{ shortcutKeyStr }}
      </div>
      <div class="text-center mt-2 text-xs">
        {{ shortcutKeyTip }}
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
let showModal = ref<boolean>(false);
let currentKeyType = ref<string>("");
const handleEdit = (type: string) => {
  showModal.value = true;
  currentKeyType.value = type;
};
const handleCloseDialog = () => {
  showModal.value = false;

  shortcutKeyStr.value = "";
};

let dialogBoxRef = ref<HTMLElement | null>(null);
document.addEventListener("mouseup", (e) => {
  if (!dialogBoxRef.value?.contains(e.target as Node)) {
    handleCloseDialog();
  }
});

let shortcutKeyData = ref<{ [key: string]: any }>({
  sound: "",
  answer: "",
});
const setShortcutKeyData = () => {
  const data = localStorage.getItem("shortcutKeys");
  shortcutKeyData.value = JSON.parse(data);
};
onMounted(() => setShortcutKeyData());

let shortcutKeyStr = ref<string>("");
const shortcutKeyTip = computed(() => {
  return shortcutKeyStr.value.trim().replace(/\s/g, " 加上 ");
});

const saveShortcutKeys = () => {
  shortcutKeyData.value[currentKeyType.value] = shortcutKeyStr.value.trim();
  localStorage.setItem("shortcutKeys", JSON.stringify(shortcutKeyData.value));
  handleCloseDialog();
};

const specialKeys = ["Alt", "Shift", "Ctrl", "Command"];
const convertCtrlKey = (key: string) => {
  return key === "Control" ? "Ctrl" : key;
};

const handleKeyup = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    saveShortcutKeys();
  }

  // 组合键
  if (e.altKey || e.shiftKey || e.ctrlKey) {
    const mainKey =
      (e.altKey && "Alt") ||
      (e.shiftKey && "Shift") ||
      (e.ctrlKey && "Ctrl") ||
      (e.metaKey && "Command");
    shortcutKeyStr.value += `${mainKey}+${e.key} `;
  } else {
    // 单个键入
    const key = convertCtrlKey(e.key);
    if ((shortcutKeyStr.value.includes(key) && specialKeys.includes(key)) || e.key === 'Enter') return;
    shortcutKeyStr.value += e.key === "Control" ? "Ctrl " : `${e.key} `;
  }
};

function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;

  return function (...args) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecTime;

    const execute = () => {
      func.apply(this, args);
      lastExecTime = currentTime;
    };

    if (elapsedTime >= delay) {
      execute();
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(execute, delay - elapsedTime);
    }
  };
}

const throttledHandleKeyup = throttle(handleKeyup, 100);
document.addEventListener("keyup", throttledHandleKeyup);
</script>
