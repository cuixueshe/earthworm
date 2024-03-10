import { it, expect, describe, vi, beforeEach } from "vitest";
import { useGenerateShareImage } from "../share";
import satori from "satori";
import { flushPromises } from "@vue/test-utils";
import { mockCanvasPrototypes } from "./helper";

vi.mock("~/api/course");
vi.mock("satori", () => {
  return {
    default: vi.fn().mockResolvedValue("svg"),
  };
});

vi.mock("../helper", async (importOriginal) => {
  return {
    ...((await importOriginal()) as any),
    fontEn: () => Promise.resolve(new ArrayBuffer(0)),
    fontZh: () => Promise.resolve(new ArrayBuffer(0)),
    convertSVGtoImg: vi.fn().mockResolvedValue("final image url"),
  };
});

describe("Share Image", () => {
  beforeEach(() => {
    mockCanvasPrototypes();
    return () => {
      vi.clearAllMocks();
    };
  });
  it("should generate an image", async () => {
    const { generateImage, shareImageSrc } = useGenerateShareImage();
    await generateImage(1);
    expect(satori).toBeCalled();
    expect(shareImageSrc.value).toBe("final image url");
  });

  it("should copy the image", async () => {
    const { generateImage, copyShareImage } = useGenerateShareImage();
    await generateImage(1);
    vi.spyOn(navigator.clipboard, "write");
    copyShareImage();
    await flushPromises();
    expect(navigator.clipboard.write).toBeCalled();
  });
});
