import { Injectable } from '@nestjs/common';
import * as superagent from 'superagent';

function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

@Injectable()
export class ToolService {
  async dailySentence() {
    // refer to https://open.iciba.com/index.php?c=wiki
    const { text } = await superagent.get('https://open.iciba.com/dsapi/');
    const data = JSON.parse(text || '{}');
    if (hasOwnProperty(data, 'note') && hasOwnProperty(data, 'content')) {
      const res = {
        zh: data.note,
        en: data.content,
      };
      return res;
    }
    return null;
  }
}
