import { ref } from "vue";
import satori, { type SatoriNode } from "satori";
import { tpl_1 } from "./imageTtemplates/tpl_1";
import { useDailySentence } from "../summary";
import {
  clearCanvas,
  convertSVGtoImg,
  copyImage,
  initCanvas,
  fontEn,
  fontZh,
} from "./helper";

export enum ShareImageTemplate {
  TPL_1 = "tpl_1",
}

interface ShareImageTemplateData {
  courseNum: string;
  zhSentence: string;
  enSentence: string;
}

export const imageTtemplates: Record<
  ShareImageTemplate,
  (data: ShareImageTemplateData) => Partial<SatoriNode>
> = {
  [ShareImageTemplate.TPL_1]: tpl_1,
};

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
    shareModalVisible,
  };
}

const generateconfig = async () => {
  const fontEnData = await fontEn();
  const fontZhData = await fontZh();
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
  const { zhSentence, enSentence } = useDailySentence();

  const shareImageSrc = ref("");
  const format = "jpg";
  const fullFormat = `image/${format}`;

  const canvasEl = initCanvas();

  const chosenTemplate = (
    templateKey: ShareImageTemplate,
    courseNum: string
  ) => {
    return imageTtemplates[templateKey]({
      courseNum,
      zhSentence: zhSentence.value,
      enSentence: enSentence.value,
    });
  };

  const generateImage = async (courseNum: string) => {
    const svg = await satori(
      chosenTemplate(ShareImageTemplate.TPL_1, courseNum),
      await generateconfig()
    ).catch((e) => {
      console.error("Error generating SVG");
      console.error(e);
      return Promise.reject(e);
    });

    shareImageSrc.value = await convertSVGtoImg(svg, canvasEl, fullFormat);
  };

  const clearShareImageSrc = () => {
    shareImageSrc.value = "";
    clearCanvas(canvasEl);
  };

  const copyShareImage = () => copyImage(canvasEl, fullFormat);

  return {
    shareImageSrc,
    generateImage,
    copyShareImage,
    clearShareImageSrc,
  };
}
