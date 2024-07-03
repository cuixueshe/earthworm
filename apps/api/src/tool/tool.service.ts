import { Injectable } from "@nestjs/common";
import * as superagent from "superagent";

@Injectable()
export class ToolService {
  async dailySentence() {
    // refer to https://open.iciba.com/index.php?c=wiki
    const { text } = await superagent.get("https://open.iciba.com/dsapi/");
    const data = JSON.parse(text);
    const res = {
      zh: data.note,
      en: data.content,
    };
    return res;
  }

  async fetchPhonetics(word: string) {
    // refer to https://github.com/creatcode/api/blob/master/YoudaoDic.md#%E9%87%8A%E4%B9%89
    const { text } = await superagent.get(`https://dict.youdao.com/jsonapi?q=${word}`);
    const data = JSON.parse(text);
    const res = {
      British: data.simple.word[0].ukphone,
      American: data.simple.word[0].usphone,
    };
    return res;
  }
}
