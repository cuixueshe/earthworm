export const tpl_1 = ({zhSentence, enSentence, courseNum}:{
  courseNum: number
  zhSentence: string
  enSentence: string
}) => {
  return {
    type: "div",
    props: {
      tw: "w-full h-full bg-[#EEA2A4] px-8 pt-8 flex flex-col items-center tracking-normal font-sans",
      children: [
        {
          type: "div",
          props: {
            tw: "bg-white rounded-xl flex-1 w-full flex flex-col px-2 py-4 mb-6 shadow-xl",
            children: [
              {
                type: "div",
                props: {
                  tw: "text-6xl font-bold flex",
                  children: '"',
                },
              },
              {
                type: "span",
                props: {
                  tw: "text-slate-400 font-bold text-2xl",
                  children: `Course ${courseNum}`,
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex-1 flex flex-col font-bold text-slate-600 text-lg leading-snug italic font-serif text-2xl",
                  style: {
                    fontFamily: '"EBGaramond", "nzgrKangxi", serif',
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        tw: "mb-2",
                        children: enSentence,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        children:  zhSentence,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  tw: "text-6xl font-bold flex justify-end",
                  children: '"',
                },
              },
            ],
          },
        },
        {
          type: "img",
          props: {
            src: "/logo.png",
            width: "48",
            height: "48",
            alt: "Earthworm logo",
          },
        },
        {
          type: "p",
          props: {
            tw: "text-lg mb-2",
            children: "© earthworm.cuixueshe.com",
          },
        },
      ],
    },
  }
}
