import SourceHanSerifSCBold from "~/assets/font/SourceHanSerif/SourceHanSerifSC-Bold.otf";
import { fontFetch } from "~/utils/fontLoader";

const loadImage = async (url: string): Promise<HTMLImageElement> => {
  const imgEl = document.createElement("img");
  imgEl.src = url;
  return new Promise((resolve, reject) => {
    imgEl.onload = () => resolve(imgEl);
    imgEl.onerror = reject;
  });
};

export const initCanvas = () => {
  const canvasEl = document.createElement("canvas");
  canvasEl.width = 900;
  canvasEl.height = 1200;
  return canvasEl;
};

export const convertSVGtoImg = async (
  svg: string,
  canvasEl: HTMLCanvasElement,
  fullFormat: string,
) => {
  const dataHeader = "data:image/svg+xml;charset=utf-8";
  const encodeAsUTF8 = (str: string) => `${dataHeader},${encodeURIComponent(str)}`;

  const svgData = encodeAsUTF8(svg);
  const img = await loadImage(svgData);

  canvasEl.getContext("2d")?.drawImage(img, 0, 0, 900, 1200);
  const dataURL = await canvasEl.toDataURL(fullFormat, 1.0);
  return dataURL;
};

export const copyImage = (canvasEl: HTMLCanvasElement, fullFormat: string) => {
  canvasEl?.toBlob((blob) => {
    if (blob) {
      navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]).then(() => {
        console.log("Image copied.");
        return true;
      });
    }
  }, fullFormat);
};

export const clearCanvas = (canvasEl: HTMLCanvasElement) => {
  const ctx = canvasEl.getContext("2d");
  ctx?.clearRect(0, 0, canvasEl.width, canvasEl.height);
};

let preLoadEnFontData: Promise<ArrayBuffer> | undefined;
let preLoadZhFontData: Promise<ArrayBuffer> | undefined;

export const fontEn = () => {
  if (preLoadEnFontData) {
    return Promise.resolve(preLoadEnFontData);
  }
  return fontFetch(new URL("/public/fonts/EBGaramond-BoldItalic.ttf", import.meta.url)).then(
    (res) => {
      preLoadEnFontData = res.arrayBuffer();
      return preLoadEnFontData;
    },
  );
};

export const fontZh = () => {
  if (preLoadZhFontData) {
    return preLoadZhFontData;
  }
  return fontFetch(new URL(SourceHanSerifSCBold, import.meta.url)).then((res) => {
    preLoadZhFontData = res.arrayBuffer();
    return preLoadZhFontData;
  });
};

export const clearFontCache = () => {
  preLoadEnFontData = undefined;
  preLoadZhFontData = undefined;
};
