import { onMounted, onUnmounted, ref } from "vue";

const getDevice = (userAgent: string) => {
  const isAndroid = ref(Boolean(userAgent.match(/Android/i)));
  const isIos = ref(Boolean(userAgent.match(/iPhone|iPad|iPod/i)));
  const isIpad = ref(Boolean(userAgent.match(/iPad/i)));
  const isOpera = ref(Boolean(userAgent.match(/Opera Mini/i)));
  const isWindows = ref(Boolean(userAgent.match(/IEMobile/i)));
  const isSSR = ref(Boolean(userAgent.match(/SSR/i)));
  const isMobile = ref(
    Boolean(isAndroid.value || isIos.value || isOpera.value || isWindows.value)
  );
  const isDesktop = !isMobile.value && !isSSR.value;

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isIpad,
    isSSR,
  };
};

function useDevice() {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  return getDevice(userAgent);
}

function useIsLandscape() {
  const isLandscape = ref(false);

  const orientationListener = () => {
    const orientation = window.screen.orientation.angle;

    if (orientation === 90 || orientation === -90) {
      isLandscape.value = true;
    }
  };

  onMounted(() => {
    orientationListener();
    screen.orientation.addEventListener("change", orientationListener);
  });

  onUnmounted(() => {
    screen.orientation.addEventListener("change", orientationListener);
  });

  return {
    isLandscape,
  };
}

export { useDevice, useIsLandscape };
