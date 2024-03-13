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
import { tpl_2 } from "./imageTtemplates/tpl_2";

export enum ShareImageTemplate {
  TPL_1 = "tpl_1",
  TPL_2 = "tpl_2",
}

export interface ShareImageTemplateData {
  courseNum: string;
  zhSentence: string;
  enSentence: string;
  userName: string,
  dateStr: string,
}

export const imageTtemplates: Record<
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
        name: "nzgrKangxi",
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
  const currImageIndex = ref(0)
  const format = "jpg";
  const fullFormat = `image/${format}`;
  const galleryImgs = ref<GalleryItem[]>([]);


  const chosenTemplate = (
    templateKey: ShareImageTemplate,
    courseNum: string,
    userName: string,
    dateStr: string
  ) => {
    return imageTtemplates[templateKey]({
      courseNum,
      zhSentence: zhSentence.value,
      enSentence: enSentence.value,
      userName,
      dateStr
    });
  };

  const generateGalleryImage = async (courseNum: string, userName: string, dateStr: string) => {
    Object.values(ShareImageTemplate).forEach(async (template, index) => {
      generateImage(courseNum, template, index, userName, dateStr);
    })
  }

  const generateImage = async (courseNum: string, template: ShareImageTemplate, index: number, userName: string, dateStr: string) => {
    const canvasEl = initCanvas();
    galleryImgs.value[index] = {
      src: "",
      canvasEl
    };
    const svg = await satori(
      chosenTemplate(template, courseNum, userName, dateStr),
      await generateConfig()
    ).catch((e) => {
      console.error("Error generating SVG");
      console.error(e);
      return Promise.reject(e);
    });

    // currImageSrc.value = await convertSVGtoImg(svg, canvasEl, fullFormat);
    galleryImgs.value[index].src = await convertSVGtoImg(svg, canvasEl, fullFormat);

    if (index === 0) {
      currImageSrc.value = galleryImgs.value[index].src;
    }
  };

  const clearShareImageSrc = () => {
    currImageSrc.value = "";
    galleryImgs.value = [];
    currImageIndex.value = 0;
  };

  const copyShareImage = (index: number) => copyImage(galleryImgs.value[index].canvasEl, fullFormat);

  const handleSelectImage = (index: number) => {
    const src = galleryImgs.value[index].src;
    if (!src) 
      return
    currImageSrc.value = src
    currImageIndex.value = index;
  }

  const preLoadFont = () => {
    fontEn()
    fontZh()  
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
