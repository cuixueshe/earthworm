export const tpl_1 = ({zhSentence, enSentence}:{
  zhSentence: string
  enSentence: string
}) => {
  return {
    type: "div",
    props: {
      tw: "w-full h-full bg-[#EEA2A4] rounded-md px-8 pt-8 flex flex-col items-center tracking-normal font-sans",
      children: [
        {
          type: "div",
          props: {
            tw: "bg-white rounded-xl flex-1 w-full flex flex-col px-2 py-4 mb-2 shadow-xl",
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
                  tw: "text-slate-400 font-bold text-md",
                  children: "Course 7",
                },
              },
              {
                type: "div",
                props: {
                  tw: "flex-1 flex flex-col font-bold text-slate-600 text-lg leading-loose italic font-serif",
                  style: {
                    fontFamily: '"EBGaramond", "nzgrKangxi", serif',
                  },
                  children: [
                    {
                      type: "div",
                      props: {
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
            tw: "text-sm mb-2",
            children: "© earthworm.cuixueshe.com",
          },
        },
      ],
    },
  }
}
