import type { SatoriNode } from "satori";

import satori from "satori";
import { ref } from "vue";

import { useDailySentence } from "../summary";
import { convertSVGtoImg, copyImage, fontEn, fontZh, initCanvas } from "./helper";
import { tpl_1 } from "./imageTemplates/tpl_1";
import { tpl_2 } from "./imageTemplates/tpl_2";

export enum ShareImageTemplate {
  TPL_1 = "tpl_1",
  TPL_2 = "tpl_2",
}

export interface ShareImageTemplateData {
  coursePackTitle: string;
  courseTitle: string;
  zhSentence: string;
  enSentence: string;
  userName: string;
  dateStr: string;
  totalRecordNumber: number;
  totalTime: string;
}

export const imageTemplates: Record<
  ShareImageTemplate,
  (data: ShareImageTemplateData) => Partial<SatoriNode>
> = {
  [ShareImageTemplate.TPL_1]: tpl_1,
  [ShareImageTemplate.TPL_2]: tpl_2,
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

const generateConfig = async () => {
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
        name: "SourceHanSerifSCBold",
        data: fontZhData,
      },
    ],
  };
};

export interface GalleryItem {
  src: string;
  canvasEl: HTMLCanvasElement;
}

export function useGenerateShareImage() {
  const { zhSentence, enSentence } = useDailySentence();

  const currImageSrc = ref("");
  const currImageIndex = ref(0);
  const format = "jpg";
  const fullFormat = `image/${format}`;
  const galleryImgs = ref<GalleryItem[]>([]);

  const chosenTemplate = (
    templateKey: ShareImageTemplate,
    coursePackTitle: string,
    courseTitle: string,
    userName: string,
    dateStr: string,
    totalRecordNumber: number,
    totalTime: string,
  ) => {
    return imageTemplates[templateKey]({
      coursePackTitle,
      courseTitle,
      zhSentence: zhSentence.value,
      enSentence: enSentence.value,
      userName,
      dateStr,
      totalRecordNumber,
      totalTime,
    });
  };

  const generateGalleryImage = async (
    coursePackTitle: string,
    courseTitle: string,
    userName: string,
    dateStr: string,
    totalRecordNumber: number,
    totalTime: string,
  ) => {
    Object.values(ShareImageTemplate).forEach(async (template, index) => {
      generateImage(
        coursePackTitle,
        courseTitle,
        template,
        index,
        userName,
        dateStr,
        totalRecordNumber,
        totalTime,
      );
    });
  };

  const generateImage = async (
    coursePackTitle: string,
    courseTitle: string,
    template: ShareImageTemplate,
    index: number,
    userName: string,
    dateStr: string,
    totalRecordNumber: number,
    totalTime: string,
  ) => {
    const canvasEl = initCanvas();
    galleryImgs.value[index] = {
      src: "",
      canvasEl,
    };
    const svg = await satori(
      chosenTemplate(
        template,
        coursePackTitle,
        courseTitle,
        userName,
        dateStr,
        totalRecordNumber,
        totalTime,
      ),
      await generateConfig(),
    ).catch((e) => {
      console.error("Error generating SVG");
      console.error(e);
      return Promise.reject(e);
    });

    // currImageSrc.value = await convertSVGtoImg(svg, canvasEl, fullFormat);
    if (galleryImgs.value[index]) {
      galleryImgs.value[index].src = await convertSVGtoImg(svg, canvasEl, fullFormat);
    }

    if (index === 0) {
      currImageSrc.value = galleryImgs.value[index].src;
    }
  };

  const clearShareImageSrc = () => {
    currImageSrc.value = "";
    galleryImgs.value = [];
    currImageIndex.value = 0;
  };

  const copyShareImage = (index: number) =>
    copyImage(galleryImgs.value[index].canvasEl, fullFormat);

  const handleSelectImage = (index: number) => {
    const src = galleryImgs.value[index].src;
    if (!src) return;
    currImageSrc.value = src;
    currImageIndex.value = index;
  };

  const preLoadFont = () => {
    fontEn();
    fontZh();
  };

  preLoadFont();

  return {
    shareImageSrc: currImageSrc,
    generateImage,
    generateGalleryImage,
    copyShareImage,
    galleryImgs,
    clearShareImageSrc,
    handleSelectImage,
    currImageIndex,
  };
}
