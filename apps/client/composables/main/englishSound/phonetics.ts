const phoneticsMap: {
  double: Record<string, string>;
  single: Record<string, string>;
} = {
  double: {
    aɪ: "",
    ɔɪ: "",
    aʊ: "",
    ɪr: "",
    ɛr: "",
    ʊr: "",
    tʃ: "",
    dʒ: "",
    dr: "",
    ts: "",
    dz: "",
    tr: "",
  },
  single: {
    ʌ: "cup",
    ɑ: "father",
    ɛ: "head",
    æ: "bird",
    ɪ: "sheep",
    i: "",
    ɔ: "",
    ʊ: "",
    u: "",
    e: "",
    p: "",
    b: "",
    t: "",
    d: "",
    k: "",
    ɡ: "",
    f: "",
    v: "",
    s: "",
    z: "",
    θ: "think",
    ð: "",
    ʃ: "",
    ʒ: "",
    h: "",
    m: "",
    j: "yes",
    ɚ: "",
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
