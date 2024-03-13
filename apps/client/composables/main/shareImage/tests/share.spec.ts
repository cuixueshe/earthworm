import { it, expect, describe, vi, beforeEach } from "vitest";
import { ShareImageTemplate, useGenerateShareImage } from "../share";
import satori from "satori";
import { flushPromises } from "@vue/test-utils";
import { mockCanvasPrototypes } from "./helper";
import { clearFontCache, convertSVGtoImg } from "../helper";
import { fontFetch } from "~/utils/fontLoader";


vi.mock("~/api/course");
vi.mock("satori", () => {
  return {
    default: vi.fn().mockResolvedValue("svg"),
  };
});

vi.mock("~/utils/fontLoader", () => {
  return {
    fontFetch: vi.fn().mockResolvedValue({arrayBuffer: () => new ArrayBuffer(0)}), 
  };
});

vi.mock("../helper", async (importOriginal) => {
  return {
    ...((await importOriginal()) as any),
    convertSVGtoImg: vi
      .fn()
      .mockResolvedValue("default image url")
      .mockResolvedValueOnce("first image url"),
  };
});


const dummyUserName = "dummyUserName";
const dummyDateStr = "2024/03/12";

describe("Share Image", () => {
  beforeEach(() => {
    mockCanvasPrototypes();
    return () => {
      clearFontCache()
      vi.clearAllMocks();
    };
  });
  it("should generate an image", async () => {
    const { generateImage, shareImageSrc } = useGenerateShareImage();
    await generateImage(
      "1",
      ShareImageTemplate.TPL_1,
      0,
      dummyUserName,
      dummyDateStr
    );
    expect(satori).toBeCalled();
    expect(shareImageSrc.value).toBe("first image url");
  });

  it("should copy the image", async () => {
    const { generateImage, copyShareImage } = useGenerateShareImage();
    const dummyIndex = 0;
    await generateImage(
      "1",
      ShareImageTemplate.TPL_1,
      dummyIndex,
      dummyUserName,
      dummyDateStr
    );
    vi.spyOn(navigator.clipboard, "write");
    copyShareImage(dummyIndex);
    await flushPromises();
    expect(navigator.clipboard.write).toBeCalled();
  });

  it("should generate some images", async () => {
    const { generateGalleryImage, galleryImgs } = useGenerateShareImage();
    await generateGalleryImage("1", dummyUserName, dummyDateStr);
    await flushPromises();
    expect(satori).toBeCalledTimes(Object.values(ShareImageTemplate).length);
    expect(galleryImgs.value.length).toEqual(
      Object.values(ShareImageTemplate).length
    );
  });

  it("should show the first image by default", async () => {
    const { generateGalleryImage, shareImageSrc } = useGenerateShareImage();
    if (vi.isMockFunction(convertSVGtoImg)) {
      convertSVGtoImg
        .mockResolvedValueOnce("first image url")
        .mockResolvedValue("default image url");
    }
    await generateGalleryImage("1", dummyUserName, dummyDateStr);
    await flushPromises();
    expect(shareImageSrc.value).toEqual("first image url");
  });

  it("should preload the font file", async () => {
    useGenerateShareImage();
    await flushPromises()
    useGenerateShareImage();
    useGenerateShareImage();
    expect(fontFetch).toBeCalledTimes(2)
  });
});
