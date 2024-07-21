import { describe, expect, it } from "vitest";

import { parse } from "./parser";

describe("pdf parser ", () => {
  it("happy path", async () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "\n" +
      "3 \n" +
      "喜欢 \n" +
      "like /laɪk/ \n";

    expect(parse(pdfText)).toMatchInlineSnapshot(`
      [
        {
          "chinese": "我",
          "english": "I",
          "soundmark": "/aɪ/",
        },
        {
          "chinese": "喜欢",
          "english": "like",
          "soundmark": "/laɪk/",
        },
      ]
    `);
  });

  it("complex", () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "\n" +
      "3 \n" +
      "我需要告诉你重要的某些事情 \n" +
      "I need to tell you something important \n" +
      "/ai/ /nid/ /te/ \n" +
      "喜欢 \n" +
      "like /laɪk/ \n";

    expect(parse(pdfText)).toMatchInlineSnapshot(`
      [
        {
          "chinese": "我",
          "english": "I",
          "soundmark": "/aɪ/",
        },
        {
          "chinese": "我需要告诉你重要的某些事情",
          "english": "I need to tell you something important",
          "soundmark": "/ai/ /nid/ /te/",
        },
        {
          "chinese": "喜欢",
          "english": "like",
          "soundmark": "/laɪk/",
        },
      ]
    `);
  });

  it("中文里面包含符号", () => {
    const pdfText =
      " \n" +
      "你好，我是星荣。 \n" +
      "中文 英文 K.K.音标 \n" +
      "我 \n" +
      "I /aɪ/ \n" +
      "它；这件事情 \n" +
      "it /it/ \n";

    expect(parse(pdfText)).toMatchInlineSnapshot(`
      [
        {
          "chinese": "我",
          "english": "I",
          "soundmark": "/aɪ/",
        },
        {
          "chinese": "它；这件事情",
          "english": "it",
          "soundmark": "/it/",
        },
      ]
    `);
  });

  it("中文部分是括号开始的", () => {
    const pdfText = "我 \n" + "I /aɪ/ \n" + "(过去)它；这件事情 \n" + "it /it/ \n";

    expect(parse(pdfText)).toMatchInlineSnapshot(`
      [
        {
          "chinese": "我",
          "english": "I",
          "soundmark": "/aɪ/",
        },
        {
          "chinese": "(过去)它；这件事情",
          "english": "it",
          "soundmark": "/it/",
        },
      ]
    `);
  });

  it("中文部分是英文开始的", () => {
    const pdfText = "我 \n" + "I /aɪ/ \n" + "be(ed形式) \n" + "been /bɪn/ \n";

    expect(parse(pdfText)).toMatchInlineSnapshot(`
      [
        {
          "chinese": "我",
          "english": "I",
          "soundmark": "/aɪ/",
        },
        {
          "chinese": "be(ed形式)",
          "english": "been",
          "soundmark": "/bɪn/",
        },
      ]
    `);
  });
});
