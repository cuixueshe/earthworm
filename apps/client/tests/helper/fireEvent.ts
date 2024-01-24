export const fireEvent = {
  keyUp(eventInitDict?: KeyboardEventInit | undefined) {
    window.dispatchEvent(new KeyboardEvent("keyup", eventInitDict));
  },
};
