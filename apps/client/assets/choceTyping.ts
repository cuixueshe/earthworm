import typing from "~/assets/sounds/typing.mp3";
import typing1 from "~/assets/sounds/typing1.mp3";
import { ACTIVE_KEYBOARD_SOUND } from "~/composables/user/sound";

export enum SoundList {
  default = "默认",
  Cherish = "樱桃",
}
export const TypingSoundList: { [key in SoundList]: string } = {
  [SoundList.default]: "默认",
  [SoundList.Cherish]: "樱桃",
};
export function getTypingSoundList() {
  return Object.entries(TypingSoundList).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });
}
export default function TypingSoundPath(): string {
  const activeSound = localStorage.getItem(ACTIVE_KEYBOARD_SOUND);
  if (activeSound === "默认") {
    return typing;
  } else {
    return typing1;
  }
}
