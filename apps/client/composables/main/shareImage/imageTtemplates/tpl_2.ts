// <div tw="max-w-[24rem] h-[36rem] flex">
//   <div tw="w-full h-full flex overflow-hidden" style={{
//     backgroundImage: "url('https://picsum.photos/400/600?blur')"
//   }}>
//     <div tw="left-8 top-8 absolute border-l-2 border-t-2 border-white w-12 h-12 flex"></div>
//     <div tw="right-8 top-8 absolute border-r-2 border-t-2 border-white w-12 h-12 flex"></div>
//     <div tw="left-8 bottom-8 absolute border-l-2 border-b-2 border-white w-12 h-12 flex"></div>
//     <div tw="right-8 bottom-8 absolute border-r-2 border-b-2 border-white w-12 h-12 flex"></div>
// <p>To: </p>
//     <div tw="p-12 flex flex-col justify-end w-full h-full text-white text-lg">
//      <p></p>
//      <p></p>
//     </div>
// <img tw="absolute right-8 bottom-8" />
//   </div>
// </div>

export const tpl_2 = ({
  zhSentence,
  enSentence,
  courseNum,
}: {
  courseNum: string;
  zhSentence: string;
  enSentence: string;
}) => ({
  type: "div",
  props: {
    tw: "w-full h-full flex flex-col overflow-hidden",
    style: {
      backgroundImage: `url('https://picsum.photos/400/600?blur&random=${Date.now()}')`,
      fontFamily: '"EBGaramond", "nzgrKangxi", serif',
    },
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
          tw: "left-8 bottom-8 absolute border-l-2 border-b-2 border-white w-12 h-12 flex",
        },
      },
      {
        type: "div",
        props: {
          tw: "right-8 bottom-8 absolute border-r-2 border-b-2 border-white w-12 h-12 flex",
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
                tw: "font-bold text-2xl",
                children: `Course ${courseNum}`,
              },
            },
            {
              type: "p",
              props: {
                children: `To: Nauxscript`,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          tw: "p-12 flex flex-col w-full justify-end text-white text-lg",
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
          tw: "flex flex-col justify-center items-center w-full",
          children: [
            {
              type: "img",
              props: {
                tw: "w-12 h-12",
                src: "/qrcode.png",
              },
            },
            {
              type: "p",
              props: {
                tw: "text-center text-white text-lg p-0",
                children: '© earthworm.cuixueshe.com',
              },
            },
          ],
        },
      },
    ],
  },
});
