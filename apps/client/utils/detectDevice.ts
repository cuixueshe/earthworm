import { onMounted, onUnmounted, ref } from "vue";

const getDevice = (userAgent: string) => {
  const isAndroid = ref(Boolean(userAgent.match(/Android/i)));
  const isIphone = ref(Boolean(userAgent.match(/iPhone|iPod/i)));
  const isIpad = ref(
    Boolean(
      (/macintosh|mac os x/i.test(navigator.userAgent) &&
        window.screen.height > window.screen.width &&
        !navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) ||
        navigator.userAgent.match(/(iPad).*OS\s([\d_]+)/)
    )
  );
  const isOpera = ref(Boolean(userAgent.match(/Opera Mini/i)));
  const isWindows = ref(Boolean(userAgent.match(/IEMobile/i)));
  const isSSR = ref(Boolean(userAgent.match(/SSR/i)));
  const isMobile = ref(
    Boolean(
      isAndroid.value || isIphone.value || isOpera.value || isWindows.value
    )
  );
  const isDesktop = !isMobile.value && !isSSR.value;

  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIphone,
    isIpad,
    isSSR,
  };
};

function useDevice() {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  return getDevice(userAgent);
}

const isLandscape = ref(false);

function useIsLandscape() {
  const orientationListener = () => {
    const orientationType = window.screen.orientation.type;

    isLandscape.value =
      orientationType === "landscape-primary" ||
      orientationType === "landscape-secondary";
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
