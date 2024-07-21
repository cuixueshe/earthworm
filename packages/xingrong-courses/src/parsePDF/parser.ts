const STARTSIGN = "中文 英文 K.K.音标";
const ENDSIGN = "中文 原形 第三人称单数 过去式 ing形式";
export function parse(text: string) {
  // 0. 先基于 \n 来切分成数组
  const rawTextList = text.split("\n").map((t) => {
    return t.trim();
  });

  // 1. 先获取到开始的点
  const startIndex = rawTextList.findIndex((t) => t === STARTSIGN);
  let endIndex = rawTextList.findIndex((t) => t.startsWith(ENDSIGN));
  if (endIndex === -1) {
    endIndex = rawTextList.length;
  }

  // 2. 过滤掉没有用的数据
  //    1. 空的
  //    2. 只有 number的（这个是换页符）
  const textList = rawTextList
    .slice(startIndex + 1, endIndex)
    // @ts-ignore
    .filter((t) => t && !/\d/.test(Number(t)));

  // 3. 成组 2个为一组  （中文 / 英文+音标）
  const result = [];

  for (let i = 0; i < textList.length; i++) {
    let data = {
      chinese: "",
      english: "",
      soundmark: "",
    };

    function run() {
      const element = textList[i];
      let chinese = "";
      let englishAndSoundmark = "";

      if (isChinese(element)) {
        chinese += element;
        while (isChinese(textList[i + 1])) {
          chinese += "，" + textList[i + 1];
          i++;
        }

        data.chinese = parseChinese(chinese);
      } else {
        englishAndSoundmark += element;

        while (textList[i + 1] && !isChinese(textList[i + 1])) {
          englishAndSoundmark += " " + textList[i + 1];
          i++;
        }

        const { english, soundmark } = parseEnglishAndSoundmark(englishAndSoundmark);

        data.english = english;
        data.soundmark = soundmark;
      }
    }

    run();
    i++;
    run();

    result.push(data);
  }

  return result;
}

function isChinese(str: string) {
  // 只要里面有中文的话  那么就作为 chinese 部分
  const reg = /[\u4e00-\u9fa5]/;
  return reg.test(str);
}

function parseEnglishAndSoundmark(text: string) {
  const list = text.split(" ");
  const soundmarkdStartIndex = list.findIndex((t) => t.startsWith("/"));

  const english = list
    .slice(0, soundmarkdStartIndex)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ")
    .trim();

  let rawSoundmark = list
    .slice(soundmarkdStartIndex)
    .join(" ")
    .split("/")
    .map((t) => {
      return t.trim().replace(/\s+/g, " ");
    })
    .filter((t) => {
      return t !== "";
    })
    .toString();

  const soundmark = `/${rawSoundmark.replace(/,/g, "/ /") + "/"}`;

  return {
    english,
    soundmark,
  };
}

function parseChinese(chinese: string) {
  function deleteComma(chinese: string) {
    return chinese.replace(/，/g, "");
  }

  return deleteComma(chinese);
}
