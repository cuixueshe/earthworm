import { ref } from "vue";

export default function judgeDevice() {
  const display = ref(false);
  //根据ua判断是否是ipad
  function is_iPad() {
    const ua = navigator.userAgent.toLowerCase();
    if (/iPad/i.test(ua)) {
      return true;
    } else {
      return false;
    }
  }
  function checkScreenOrientation() {
    if (
      window.screen.orientation.angle != 90 &&
      window.screen.orientation.angle != -90 &&
      is_iPad()
    ) {
      showTip();
    } else {
      hideTip();
    }
  }

  //改变屏幕方向，但是screen.orientation.lock无法使用
  function changeOrient() {}
  function showTip() {
    display.value = true;
  }
  function hideTip() {
    display.value = false;
  }
  return { display, is_iPad, showTip, hideTip, checkScreenOrientation };
}
