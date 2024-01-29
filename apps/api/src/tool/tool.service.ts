import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

@Injectable()
export class ToolService {
  async dailySentence() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const { text } = await superagent.get(
      `https://open.iciba.com/dsapi/?date=${year}-${
        month < 10 ? '0' + month : month
      }-${day < 10 ? '0' + day : day}`,
    );
    const data = JSON.parse(text);
    const res = {
      zh: data.note,
      en: data.content,
    };
    return res;
  }
}
