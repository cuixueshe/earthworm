import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

@Injectable()
export class ToolService {
  async dailySentence() {
    const { text } = await superagent.get(
      'https://open.iciba.com/dsapi/?date=2023-05-03',
    );
    const data = JSON.parse(text);
    const res = {
      zh: data.note,
      en: data.content,
    };
    return res;
  }
}
