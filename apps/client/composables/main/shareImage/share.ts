import { ref, watch } from "vue";
import satori from 'satori';
import { tpl_1 } from "./imageTtemplates/tpl_1";
import { useDailySentence } from "../summary";
import { useCourseStore } from "~/store/course";

const shareModalVisible = ref(false);
export function useShareModal() {
  function showShareModal() {
    shareModalVisible.value = true;
  }

  function hideShareModal() {
    shareModalVisible.value = false;
  }

  return {
    showShareModal,
    hideShareModal,
    shareModalVisible
  };
}

const fontEn = fetch(new URL('~/assets/fonts/EBGaramond-BoldItalic.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const fontZh = fetch(new URL('~/assets/fonts/nzgrKangxi.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const generateconfig = async () => {
  const fontEnData = await fontEn;
  const fontZhData = await fontZh;
  return {
    width: 400,
    height: 600,
    embedFont: true,
    fonts: [
      {
        name: "EBGaramond",
        data: fontEnData,
      },
      {
        name: "nzgrKangxi",
        data: fontZhData,
      },
    ],
  };
};

export function useGenerateShareImage() {
  const courseStore = useCourseStore();
  const { zhSentence, enSentence } = useDailySentence();

  const shareImageSrc = ref("");
  const format = "jpg";
  const fullFormat = `image/${format}`;

  let canvasEl:HTMLCanvasElement
  const convertSVGtoImg = async (svg: string) => {
    const dataHeader = "data:image/svg+xml;charset=utf-8";
    const encodeAsUTF8 = (str: string) =>
      `${dataHeader},${encodeURIComponent(str)}`;

    const loadImage = async (url: string): Promise<HTMLImageElement> => {
      const imgEl = document.createElement("img");
      imgEl.src = url;
      return new Promise((resolve, reject) => {
        imgEl.onload = () => resolve(imgEl);
        imgEl.onerror = reject;
      });
    };

    
    const svgData = encodeAsUTF8(svg);
    const img = await loadImage(svgData);
    canvasEl = document.createElement("canvas");
    canvasEl.width = 900;
    canvasEl.height = 1200;
    canvasEl.getContext("2d")?.drawImage(img, 0, 0, 900, 1200);
    const dataURL = await canvasEl.toDataURL(fullFormat, 1.0);
    shareImageSrc.value = dataURL;
  };

  
  const generateImage = async () => {
    if (!courseStore.currentCourse) {
      return
    }
    const svg = await satori(
      tpl_1({
        courseNum: courseStore.currentCourse.id,
        zhSentence: zhSentence.value,
        enSentence: enSentence.value,
      }),
      await generateconfig()
    ).catch((e) => {
      console.error("Error generating SVG");
      console.error(e);
      return Promise.reject(e);
    });

    convertSVGtoImg(svg);
  };

  const copyImage = () => {
    canvasEl?.toBlob((blob) => {
      if (blob) {
        navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        console.log("Image copied.");
      }
    }, fullFormat);
  }

  watch(shareModalVisible, newVal => (newVal && generateImage()))

  return {
    shareImageSrc,
    generateImage,
    copyImage  
  };
}
