import { describe, it, expect, vi, beforeEach } from "vitest";
import { useCurrentStatementEnglishSound, reset } from "..";
import { updateSource, play } from "../audio";
import { createTestingPinia } from "@pinia/testing";
import { useCourseStore } from "~/store/course";

vi.mock("../audio.ts", () => {
  return {
    updateSource: vi.fn(),
    play: vi.fn(),
  };
});

describe("useCurrentStatementEnglishSound", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    createTestingPinia({
      createSpy: vi.fn,
    });

    const courseStore = useCourseStore();
    courseStore.currentStatement = {
      english: "I",
    };

    vi.clearAllMocks();
    reset();
  });

  it("plays sound", async () => {
    const { playSound } = useCurrentStatementEnglishSound();

    playSound();

    expect(play).toHaveBeenCalled();
  });

  it('should updates audio source', async () => {
    useCurrentStatementEnglishSound();

    expect(updateSource).toBeCalledTimes(1)

    // update english value
    const courseStore = useCourseStore();
    courseStore.currentStatement.english = "like";
    await vi.advanceTimersToNextTimerAsync();

    expect(updateSource).toBeCalledTimes(2);
	
  });

  it("does not update audio source if the word is the same", async () => {
    const { playSound } = useCurrentStatementEnglishSound();

    const courseStore = useCourseStore();
    courseStore.currentStatement = {
      english: "I",
    };

    expect(updateSource).toHaveBeenCalledTimes(1);
  });
});
