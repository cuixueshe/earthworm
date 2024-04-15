<template>
  <div class="relative flex flex-col w-full">
    <h2 class="py-2 mb-4 text-3xl text-center border-b dark:border-gray-600">
      星荣零基础学英语课程
    </h2>
    <div class="h-full scrollbar-hide">
      <div
        v-if="courses.length"
        class="course-wrapper h-[79vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pl-0 pr-4 pb-96 overflow-x-hidden overflow-y-auto gap-8 justify-start"
      >
        <template
          v-for="(course, index) in courses"
          :key="course.id"
        >
          <NuxtLink
            :href="`/main/${course.id}`"
            @click="handleChangeCourse(course)"
          >
            <CoursesCourseCard
              :title="course.title"
              :id="course.id"
              :count="course.count"
              :class="{ 'pointer-move': activeCourseIndex === index }"
            />
          </NuxtLink>
        </template>
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchCourses } from "~/api/course";
import { fetchCourseHistory } from "~/api/courseHistory";
import { useActiveCourseId } from "~/composables/courses/activeCourse";
import { type Course } from "~/store/course";

const router = useRouter();

const courses = ref<Course[]>([]);
const { updateActiveCourseId, activeCourseId } = useActiveCourseId();
const activeCourseIndex = ref(0); 
let topPosition = 0
let countInLine = 0 
const courseDomInfo = {
  height: 0,
  width: 0
}

onMounted(async () => {
  courses.value = await getCourses();
  activeCourseIndex.value = activeCourseId.value? courses.value.findIndex((item) => item.id === activeCourseId.value) : 0;
  await getCourseDomInfo()
  await getFirstCourseTopPotision()
  await clacCountInLine()
  window.addEventListener("resize", clacCountInLine)
  window.addEventListener("keydown", handleKeyDown)
});

async function getCourseHistory() {
  const res = await fetchCourseHistory();
  const historyMap: Map<number, any> = new Map();
  res.forEach((item) => {
    historyMap.set(item.courseId, {
      count: item.completionCount,
    });
  });
  return historyMap;
}

async function getCourses() {
  const completionMap = await getCourseHistory();
  const courses = await fetchCourses();
  return courses.map((item) => {
    if (completionMap.has(item.id)) {
      return {
        ...item,
        ...completionMap.get(item.id),
      };
    } else {
      return item;
    }
  });
}

function handleChangeCourse(course: Course) {
  updateActiveCourseId(course.id);
}

async function getCourseDomInfo() {
  await nextTick()
  const courseDom = document.querySelector('.pointer-move')
  if(courseDom) {
    courseDomInfo.height = courseDom.clientHeight;
    courseDomInfo.width = courseDom.clientWidth;
  }
}
async function getFirstCourseTopPotision() {
  await nextTick()
  const wrapper = document.querySelector('.course-wrapper') as HTMLElement;
  const { top } = wrapper.getBoundingClientRect();
  topPosition = top;
}

async function clacCountInLine() {
  await nextTick()
  await getCourseDomInfo()
  const wrapper = document.querySelector('.course-wrapper') as HTMLElement;
  const clientWidth = wrapper.clientWidth;
  countInLine = Math.floor(clientWidth / (courseDomInfo.width)) // fixme: 如何才能准确计算
}

async function isCourseDomInView() {
  await nextTick()
  // 获取当前聚焦的课程DOM
  const courseDom = document.querySelector('.pointer-move') as HTMLElement;
  const courseDomRect = courseDom.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  // 课程DOM不在可视区域，向下滚动
  if(clientHeight < courseDomRect.top + courseDomInfo.height) {
    courseDom.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
  // 课程DOM不在可视区域，向上滚动
  if(courseDomRect.top < topPosition) {
    courseDom.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }
}

function handleKeyDown(event: KeyboardEvent) {
  const key = event.key;
  const preventArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", " ", "Enter", "Escape"]
  if(preventArr.includes(key)) {
    event.preventDefault()
  }
  if (key === "ArrowUp" || key === "w") {
    activeCourseIndex.value = Math.max(activeCourseIndex.value - countInLine, 0);
  }
  if (key === "ArrowDown" || key === "s") {
    activeCourseIndex.value = Math.min(activeCourseIndex.value + countInLine, courses.value.length - 1);
  }
  if (key === "ArrowLeft" || key === "a") {
    activeCourseIndex.value = Math.max(activeCourseIndex.value - 1, 0);
  }
  if (key === "ArrowRight" || key === "d") {
    activeCourseIndex.value = Math.min(activeCourseIndex.value + 1, courses.value.length - 1);
  }
  if(key === ' ' || key === 'Enter') {
    const course = courses.value[activeCourseIndex.value]
    handleChangeCourse(course)
    // 前往课程页面
    router.push(`/main/${course.id}`)
  }
  if(key === 'Escape') {
    // 回到最初的course
    const index = courses.value.findIndex((item) => item.id === activeCourseId.value)
    activeCourseIndex.value = index;
  }
  isCourseDomInView()
}

onUnmounted(() => {
  window.removeEventListener("resize", clacCountInLine)
  window.removeEventListener("keydown", handleKeyDown)
})
</script>

<style scoped>
.pointer-move {
  box-shadow: 4px 8px 8px rgba(153, 102, 255, 0.2); 
}
</style>
