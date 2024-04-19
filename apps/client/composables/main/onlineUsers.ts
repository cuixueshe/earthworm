import io from "socket.io-client";
import { onMounted, onUnmounted, ref } from "vue";

import { useUserStore } from "~/store/user";
import { isProd } from "~/utils/env";

const ws = isProd() ? "wss://earthworm.cuixueshe.com/api" : "ws://localhost:3001";

function useSocket(userId: string) {
  const socket = io(ws, {
    transportOptions: {
      polling: {
        extraHeaders: {
          "User-Id": userId,
        },
      },
    },
  });
  return {
    socket,
  };
}

export function useOnline() {
  const userStore = useUserStore();
  const onlineUserCount = ref(0);

  const userId = userStore.userInfo?.sub || "";
  const { socket } = useSocket(userId);

  function watchOnlineUsers() {
    socket.on("onlineUsers", (count: number) => {
      onlineUserCount.value = count;
    });
  }

  const leaveGame = () => socket.close();

  return {
    onlineUserCount,
    watchOnlineUsers,
    leaveGame,
  };
}
