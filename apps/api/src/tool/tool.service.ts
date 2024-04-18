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
}
