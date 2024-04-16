import { beforeEach, describe, expect, it } from "vitest";

import {
  AUTO_PRONUNCIATION,
  KEYBOARD_SOUND_KEY,
  useAutoPronunciation,
  useKeyboardSound,
} from "../sound";

describe("auto play sound", () => {
  beforeEach(() => {
    const { removeAutoPlaySound } = useAutoPronunciation();
    removeAutoPlaySound();
  });

  it("should be true if no cache", () => {
    const { isAutoPlaySound } = useAutoPronunciation();

    expect(isAutoPlaySound()).toBe(true);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(AUTO_PRONUNCIATION, "false");

    const { isAutoPlaySound } = useAutoPronunciation();

    expect(isAutoPlaySound()).toBe(false);
  });

  it("should be toggle value", () => {
    const { isAutoPlaySound, toggleAutoPlaySound } = useAutoPronunciation();

    expect(isAutoPlaySound()).toBe(true);

    toggleAutoPlaySound();

    expect(isAutoPlaySound()).toBe(false);
  });
});

describe("keyboard sound", () => {
  beforeEach(() => {
    const { removeKeyboardSound } = useKeyboardSound();
    removeKeyboardSound();
  });

  it("should be true if no cache", () => {
    const { isKeyboardSoundEnabled } = useKeyboardSound();

    expect(isKeyboardSoundEnabled()).toBe(true);
  });

  it("should be equal to cache value if it exists", () => {
    localStorage.setItem(KEYBOARD_SOUND_KEY, "false");

    const { isKeyboardSoundEnabled } = useKeyboardSound();

    expect(isKeyboardSoundEnabled()).toBe(false);
  });

  it("should be toggle value", () => {
    const { isKeyboardSoundEnabled, toggleKeyboardSound } = useKeyboardSound();

    expect(isKeyboardSoundEnabled()).toBe(true);

    toggleKeyboardSound();

    expect(isKeyboardSoundEnabled()).toBe(false);
  });
});
