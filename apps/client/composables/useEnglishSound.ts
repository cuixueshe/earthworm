export function useEnglishSound(word: Ref<string>) {
  var audio = new Audio();

  watchEffect(() => {
    audio.src = `https://dict.youdao.com/dictvoice?audio=${word.value}&type=1`;
  });

  return {
    play: () => {
      audio.play();
    },
  };
}
