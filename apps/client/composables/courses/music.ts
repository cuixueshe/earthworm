import { computed, ref } from "vue";
import course1 from "~/assets/music/courses/1.json";
import music1 from "~/assets/music/courses/1.mp3";
import course2 from "~/assets/music/courses/2.json";
import music2 from "~/assets/music/courses/2.mp3";
import course3 from "~/assets/music/courses/3.json";
import music3 from "~/assets/music/courses/3.mp3";
import { useCourseProgress } from "~/composables/courses/progress";
import { type Course } from "~/store/course";

export const MUSIC_COURSES = ref<Course[]>([
  { id: 1, title: "Twinkle Twinkle Little Star", statements: course1 },
  { id: 2, title: "Yesterday Once More", statements: course2 },
  { id: 3, title: "My Love", statements: course3 },
]);

type MusicMap = Record<number, string>;

const MUSIC_MAP: MusicMap = {
  1: music1,
  2: music2,
  3: music3,
};

export const MUSIC_CHAPTER = "musicChapter";

export function useMusicChapter() {
  const { cleanProgress } = useCourseProgress();

  const musicChapter = ref<number>(
    Number(localStorage.getItem(MUSIC_CHAPTER)) || 1
  );

  function updateMusicChapter(id: number) {
    musicChapter.value = id;
    localStorage.setItem(MUSIC_CHAPTER, String(id));
    cleanProgress();
  }

  function restMusicChapter() {
    localStorage.removeItem(MUSIC_CHAPTER);
  }

  const currentMusicCourse = computed(() => {
    return MUSIC_COURSES.value.find((item) => item.id === musicChapter.value);
  });
  const currentMusic = computed(() => MUSIC_MAP[musicChapter.value]);

  return {
    musicChapter,
    updateMusicChapter,
    restMusicChapter,
    currentMusicCourse,
    currentMusic,
  };
}
