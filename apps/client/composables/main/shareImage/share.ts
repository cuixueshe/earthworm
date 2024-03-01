import { ref } from "vue";
import satori, { type SatoriNode } from "satori";
import { tpl_1 } from "./imageTtemplates/tpl_1";
import { useDailySentence } from "../summary";
import { useCourseStore } from "~/store/course";
import { clearCanvas, convertSVGtoImg, copyImage, initCanvas } from "./helper";
import { fontEn, fontZh } from "~/api/tool";

export enum ShareImageTemplate {
  TPL_1 = "tpl_1",
}

interface ShareImageTemplateData {
  courseNum: number;
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
  const courseStore = useCourseStore();
  const { zhSentence, enSentence } = useDailySentence();

  const shareImageSrc = ref("");
  const format = "jpg";
  const fullFormat = `image/${format}`;

  const canvasEl = initCanvas();

  const chosenTemplate = (templateKey: ShareImageTemplate) => {
    if (!courseStore.currentCourse) {
      return;
    }
    return imageTtemplates[templateKey]({
      courseNum: courseStore.currentCourse.id,
      zhSentence: zhSentence.value,
      enSentence: enSentence.value,
    });
  };

  const generateImage = async () => {
    const svg = await satori(
      chosenTemplate(ShareImageTemplate.TPL_1),
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
