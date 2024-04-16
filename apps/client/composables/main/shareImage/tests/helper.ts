import { vi } from "vitest";

export const mockCanvasPrototypes = () => {
  HTMLCanvasElement.prototype.toBlob = (cb, type) => {
    cb(new Blob([""], { type }));
  };

  HTMLCanvasElement.prototype.getContext = vi.fn() as any;
};
