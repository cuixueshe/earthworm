const phoneticsMap: {
  double: Record<string, string>;
  single: Record<string, string>;
} = {
  // 双字符
  double: {
    // 单元音
    ɪr: "ear",
    // 双元音
    aɪ: "eye",
    aʊ: "mouth",
    ɔɪ: "boy",
    // 清音
    tʃ: "cheese",
    // 浊音
    dʒ: "jump",
  },
  // 单字符
  single: {
    // 单元音
    i: "happy",
    ɪ: "sheep",
    e: "day_002",
    ɛ: "head",
    æ: "bird",
    ɑ: "father",
    o: "nose",
    ɔ: "horse",
    u: "blue",
    ᴜ: "foot",
    ʌ: "cup",
    ə: "above",
    ɚ: "mother",
    ɝ: "mother",
    // 清音
    p: "pen",
    t: "town",
    k: "cat",
    f: "fish",
    s: "say",
    θ: "think",
    ʃ: "she",
    h: "hand",
    // 浊音
    b: "book",
    d: "day_001",
    ɡ: "give",
    v: "very",
    z: "zoo",
    ð: "this",
    ʒ: "vision",
    m: "moon",
    n: "name",
    ŋ: "sing",
    l: "look",
    r: "run",
    j: "yes",
    w: "we",
  },
};

export function getPhoneticsRegExp() {
  const result = [
    ...Object.keys(phoneticsMap.double),
    ...Object.keys(phoneticsMap.single),
    "\\/",
    "\\s",
    "'",
    "ˌ",
  ];
  return new RegExp(result.join("|"), "g");
}

export function isPhonetic(text: string) {
  const phonetics = [
    ...Object.keys(phoneticsMap.double),
    ...Object.keys(phoneticsMap.single),
  ];
  return phonetics.includes(text);
}

export async function playPhonetics(text: string) {
  const phonetics = { ...phoneticsMap.double, ...phoneticsMap.single };
  if (phonetics[text]) {
    const res = await import(
      `../../../assets/sounds/phonetics/${phonetics[text]}.mp3`
    );
    new Audio(res.default).play();
  }
}
