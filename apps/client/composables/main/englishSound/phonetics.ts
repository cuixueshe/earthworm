import { PronunciationType, usePronunciation } from "~/composables/user/pronunciation";

const phoneticsMap: {
  double: Record<string, string>;
  single: Record<string, string>;
  triple: Record<string, string>;
} = {
  single: {
    ɪ: "ship",
    æ: "hat",
    ʌ: "cup",
    ɒ: "sock",
    ʊ: "foot",
    e: "head",
    ə: "above",
    ɚ: "mother",
    p: "pen",
    b: "book",
    t: "town",
    d: "day_001",
    k: "cat",
    g: "give",
    f: "fish",
    v: "very",
    θ: "think",
    ð: "this",
    s: "say",
    z: "zoo",
    ʃ: "she",
    ʒ: "vision",
    m: "moon",
    n: "name",
    ŋ: "sing",
    l: "look",
    r: "run",
    w: "we",
    j: "yes",
    h: "hand",
    i: "happy",
    u: "situation",
    x: "loch",
  },
  double: {
    iː: "sheep",
    ɑː: "father",
    ɔː: "horse",
    uː: "blue",
    ɜː: "bird",
    ɝː: "bird",
    eɪ: "day_002",
    aɪ: "eye",
    ɔɪ: "boy",
    əʊ: "nose",
    oʊ: "nose",
    aʊ: "mouth",
    ɪə: "ear",
    eə: "hair",
    ʊə: "pure",
    t̬: "cutting",
    tʃ: "cheese",
    dʒ: "jump",
    ɒ̃: "croissant",
    əl: "label",
    əm: "criticism",
    ən: "sudden",
    ər: "dictionary",
  },
  triple: {
    aɪə: "fire",
    aʊə: "hour",
  },
};

export function getPhoneticsRegExp() {
  const result = [
    ...Object.keys(phoneticsMap.double),
    ...Object.keys(phoneticsMap.single),
    ...Object.keys(phoneticsMap.triple),
    "\\/",
    "\\s",
    "'",
    "ˌ",
  ];
  return new RegExp(result.join("|"), "g");
}

export function isPhonetic(text: string) {
  const phonetics = [
    ...Object.keys(phoneticsMap.triple),
    ...Object.keys(phoneticsMap.double),
    ...Object.keys(phoneticsMap.single),
  ];
  return phonetics.includes(text);
}

export async function playPhonetics(text: string) {
  const { pronunciation } = usePronunciation();
  const phonetics = { ...phoneticsMap.triple, ...phoneticsMap.double, ...phoneticsMap.single };
  if (phonetics[text]) {
    let res;
    console.log(pronunciation.value);
    if (pronunciation.value === PronunciationType.American) {
      res = await import(`../../../assets/sounds/phonetics/${phonetics[text]}_us.ogg`);
    } else if (pronunciation.value === PronunciationType.British) {
      res = await import(`../../../assets/sounds/phonetics/${phonetics[text]}_uk.ogg`);
    }
    if (res) {
      new Audio(res.default).play();
    }
  }
}
