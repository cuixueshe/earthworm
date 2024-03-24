export function isMobileSystem() {
  return "ontouchstart" in document.documentElement;
}
