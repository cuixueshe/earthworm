import { it, expect, describe } from "vitest";
import { parse, parseEnglishAndSoundMark } from "./parsePdf";

it("happy path", () => {
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

  expect(parse(pdfText)).toEqual([
    {
      chinese: "我",
      english: "I",
      soundMark: "/aɪ/",
    },
    {
      chinese: "喜欢",
      english: "like",
      soundMark: "/laɪk/",
    },
  ]);
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

  expect(parse(pdfText)).toEqual([
    {
      chinese: "我",
      english: "I",
      soundMark: "/aɪ/",
    },
    {
      chinese: "我需要告诉你重要的某些事情",
      english: "I need to tell you something important",
      soundMark: "/ai/ /nid/ /te/",
    },
    {
      chinese: "喜欢",
      english: "like",
      soundMark: "/laɪk/",
    },
  ]);
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

  expect(parse(pdfText)).toEqual([
    {
      chinese: "我",
      english: "I",
      soundMark: "/aɪ/",
    },
    {
      chinese: "它；这件事情",
      english: "it",
      soundMark: "/it/",
    },
  ]);
});

describe("parse english and soundmark", () => {
  it("parse simply ", () => {
    expect(parseEnglishAndSoundMark("like /laɪk/")).toEqual({
      english: "like",
      soundMark: "/laɪk/",
    });
  });

  it("parse multi group", () => {
    expect(parseEnglishAndSoundMark("like me /laɪk/ /me/")).toEqual({
      english: "like me",
      soundMark: "/laɪk/ /me/",
    });
  });
});

// describe("parsePdf", () => {
// //   it("happy path", () => {
// //     const pdfText =
// //       " \n" +
// //       "你好，我是星荣。 \n" +
// //       "中文 英文 K.K.音标 \n" +
// //       "我 \n" +
// //       "I /aɪ/ \n" +
// //       "\n" +
// //       "3 \n" + // //       "喜欢 \n" +
// //       "like /laɪk/ \n";

// //     expect(parse(pdfText)).toEqual([
// //       {
// //         chinese: "我", // //         english: "I",
// //         soundMark: "/aɪ/",
// //       },
// //       {
// //         chinese: "喜欢",
// //         english: "like",
// //         soundMark: "/laɪk/",
// //       },
// //     ]);

// //   }

//     it("complex", () => {
//       const pdfText =
//         " \n" +
//         "你好，我是星荣。 \n" +
//         "中文 英文 K.K.音标 \n" +
//         "我 \n" +
//         "I /aɪ/ \n" +
//         "\n" +
//         "3 \n" + //         "我需要告诉你重要的某些事情 \n" +
//         "I need to tell you something important \n" +
//         "/ai/ /nid/ /te/ \n" +
//         "喜欢 \n" +
//         "like /laɪk/ \n";

//       expect(parse(pdfText)).toEqual([
//         {
//           chinese: "我",
//           english: "I",
//           soundMark: "/aɪ/",
//         },
//         {
//           chinese: "我需要告诉你重要的某些事情",
//           english: "I need to tell you something important",
//           soundMark: "/ai/ /nid/ /te/",
//         },
//         {
//           chinese: "喜欢",
//           english: "like",
//           soundMark: "/laɪk/",
//         },
//       ]);

//       it("中文里面包含符号", () => {
//         const pdfText =
//           " \n" +
//           "你好，我是星荣。 \n" +
//           "中文 英文 K.K.音标 \n" +
//           "我 \n" +
//           "I /aɪ/ \n" +
//           "它；这件事情 \n" +
//           "it /it/ \n";

//         expect(true).toBe(false);
//         // expect(parse(pdfText)).toEqual([
//         //   {
//         //     chinese: "我",
//         //     english: "I",
//         //     soundMark: "/aɪ/",
//         //   },
//         //   {
//         //     chinese: "我需要告诉你重要的某些事情",
//         //     english: "I need to tell you something important",
//         //     soundMark: "/ai/ /nid/ /te/",
//         //   },
//         //   {
//         //     chinese: "喜欢",
//         //     english: "like",
//         //     soundMark: "/laɪk/",
//         //   },
//         // ]);
//       });
//     });

//   );

//   describe("parse english and soundmark", () => {
//     it("parse simply ", () => {
//       expect(parseEnglishAndSoundMark("like /laɪk/")).toEqual({
//         english: "like",
//         soundMark: "/laɪk/",
//       });
//     });

//     it("parse multi group", () => {
//       expect(parseEnglishAndSoundMark("like me /laɪk/ /me/")).toEqual({
//         english: "like me",
//         soundMark: "/laɪk/ /me/",
//       });
//     });
//   });
// });

//     it("complex", () => {
//       const pdfText =
//         " \n" +
//         "你好，我是星荣。 \n" +
//         "中文 英文 K.K.音标 \n" +
//         "我 \n" +
//         "I /aɪ/ \n" +
//         "\n" +
//         "3 \n" +
//         "我需要告诉你重要的某些事情 \n" +
//         "I need to tell you something important \n" +
//         "/ai/ /nid/ /te/ \n" +
//         "喜欢 \n" +
//         "like /laɪk/ \n";

//       expect(parse(pdfText)).toEqual([
//         {
//           chinese: "我",
//           english: "I",
//           soundMark: "/aɪ/",
//         },
//         {
//           chinese: "我需要告诉你重要的某些事情",
//           english: "I need to tell you something important",
//           soundMark: "/ai/ /nid/ /te/",
//         },
//         {
//           chinese: "喜欢",
//           english: "like",
//           soundMark: "/laɪk/",
//         },
//       ]);

//       it("中文里面包含符号", () => {
//         const pdfText =
//           " \n" +
//           "你好，我是星荣。 \n" +
//           "中文 英文 K.K.音标 \n" +
//           "我 \n" +
//           "I /aɪ/ \n" +
//           "它；这件事情 \n" +
//           "it /it/ \n";

//         expect(true).toBe(false);

//         // expect(parse(pdfText)).toEqual([
//         //   {
//         //     chinese: "我",
//         //     english: "I",
//         //     soundMark: "/aɪ/",
//         //   },
//         //   {
//         //     chinese: "我需要告诉你重要的某些事情",
//         //     english: "I need to tell you something important",
//         //     soundMark: "/ai/ /nid/ /te/",
//         //   },
//         //   {
//         //     chinese: "喜欢",
//         //     english: "like",
//         //     soundMark: "/laɪk/",
//         //   },
//         // ]);
//       });
//     });
