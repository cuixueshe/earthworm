import type { ShareImageTemplateData } from "../share";

export const tpl_2 = ({
  zhSentence,
  enSentence,
  coursePackTitle,
  courseTitle,
  userName,
  dateStr,
}: ShareImageTemplateData) => ({
  type: "div",
  props: {
    tw: "w-full h-full flex flex-col overflow-hidden",
    style: {
      backgroundImage: `url('https://picsum.photos/400/600?blur&random=${Date.now()}')`,
      fontFamily: '"EBGaramond", "SourceHanSerifSCBold" , sans-serif',
    },
    children: [
      {
        type: "div",
        props: {
          tw: "w-full h-full flex flex-col overflow-hidden bg-[rgba(0,0,0,0.2)]",
          children: [
            {
              type: "div",
              props: {
                tw: "left-8 top-8 absolute border-l-2 border-t-2 border-white w-12 h-12 flex",
              },
            },
            {
              type: "div",
              props: {
                tw: "right-8 top-8 absolute border-r-2 border-t-2 border-white w-12 h-12 flex",
              },
            },
            {
              type: "div",
              props: {
                tw: "left-8 bottom-18 absolute border-l-2 border-b-2 border-white w-12 h-12 flex",
              },
            },
            {
              type: "div",
              props: {
                tw: "right-8 bottom-18 absolute border-r-2 border-b-2 border-white w-12 h-12 flex",
              },
            },
            {
              type: "div",
              props: {
                tw: "p-12 flex flex-col justify-start w-full text-white text-lg",
                children: [
                  {
                    type: "span",
                    props: {
                      tw: "font-bold text-3xl pt-2",
                      children: `${coursePackTitle}`,
                    },
                  },
                  {
                    type: "span",
                    props: {
                      tw: "font-bold text-3xl pt-2",
                      children: `${courseTitle}`,
                    },
                  },
                  {
                    type: "div",
                    props: {
                      tw: "w-1/2 border-0 border-t-2 border-white my-2",
                    },
                  },
                  {
                    type: "p",
                    props: {
                      tw: "text-lg m-0",
                      children: `${userName}${userName ? "  •  " : ""}${dateStr} `,
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                tw: "flex flex-col w-full justify-center text-white text-2xl px-10",
                children: [
                  {
                    type: "p",
                    props: {
                      children: enSentence,
                    },
                  },
                  {
                    type: "p",
                    props: {
                      children: zhSentence,
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                tw: "absolute right-0 left-0 bottom-2 leading-tight flex flex-col justify-center items-center w-full",
                children: [
                  {
                    type: "img",
                    props: {
                      tw: "w-12 h-13 p-0 m-0 flex-shirk-0",
                      src: "/qrcode.png",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
});
