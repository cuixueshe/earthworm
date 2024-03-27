import typing from "~/assets/sounds/typing.mp3";
import typing1 from "~/assets/sounds/typing1.mp3";
import { ACTIVE_KEYBOARD_SOUND } from "~/composables/user/sound";

export enum SoundList {
  default = "默认",
  Cherish = "Cherish",
}
export const TypingSoundList: { [key in SoundList]: string } = {
  [SoundList.default]: "默认",
  [SoundList.Cherish]: "Cherish",
};
export function getTypingSoundList() {
  return Object.entries(TypingSoundList).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });
}
export function TypingSoundPath(): string {
  const activeSound = localStorage.getItem(ACTIVE_KEYBOARD_SOUND);
  if (activeSound === "默认" || activeSound === null) {
    return typing;
  } else {
    return typing1;
  }
}
