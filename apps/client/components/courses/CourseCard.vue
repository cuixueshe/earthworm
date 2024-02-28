<template>
  <div
    class="flex flex-col w-[360px] h-[160px] sm:w-[500px] md:w-[340px] lg:w-[280px] xl:w-[260px] p-4 pb-6 border border-slate-400 hover:shadow-lg hover:shadow-purple-400/50 hover:border-purple-400 transition-all duration-500 relative">
    <h3 class="text-xl font-bold dark:text-gray-100" :class="activeCourse
      ? '  text-fuchsia-500'
      : ''
      ">{{ title }}</h3>
    <p class="mt-4 truncate">this is the course's description</p>
    <canvas v-if="!!courseCanvasBorderId" :id="courseCanvasBorderId" class="absolute top-0 left-0 w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useGameStore } from "~/store/game";
import { COURSE_PROGRESS } from "~/store/course";

const props = defineProps<{
  title: string;
  id: number;
}>();

const gameStore = useGameStore();
const activeCourse = computed(() => gameStore.activeCourseId == props.id)

const courseCanvasBorderId = computed(() => {
  if (hasCourseKey()) {
    return `courseCanvasBorder-${props.id}`;
  } else {
    return "";
  }
});

const localCourseProgress = ref<any>({});
function hasCourseKey() {
  localCourseProgress.value = {};
  const courseProgress = localStorage.getItem(COURSE_PROGRESS);
  if (!courseProgress) return false;
  const _courseProgress = JSON.parse(courseProgress);
  localCourseProgress.value = _courseProgress;
  const courseKeys = Object.keys(_courseProgress);
  return courseKeys && courseKeys.includes(props.id.toString());
}

function initBorderProgress() {
  if (hasCourseKey()) {
    const courseCanvas = document.getElementById(
      courseCanvasBorderId.value
    ) as HTMLCanvasElement;
    const ctx = courseCanvas.getContext("2d") as CanvasRenderingContext2D;

    const borderWidth = 4;
    const rectWidth = courseCanvas.width - borderWidth;
    const rectHeight = courseCanvas.height - borderWidth;

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = "rgba(255,0,0,0)";
    ctx.rect(1, 1, rectWidth, rectHeight);
    ctx.stroke();

    startProgress(ctx, rectWidth, rectHeight, borderWidth);
  }
}

onMounted(() => initBorderProgress());

function startProgress(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  borderWidth: number
) {
  const _border = borderWidth / 2;
  const halfPerimeter = width + height;
  const perimeter = halfPerimeter * 2;

  const courseProgressValue = localCourseProgress.value[props.id];
  let ratio = courseProgressValue.index / courseProgressValue.total;
  // 如果是0，认定该节课已完成
  if (ratio == 0) {
    ratio = 1;
  }
  const _progressLen = Number((ratio * perimeter).toFixed(2));

  ctx.beginPath();
  ctx.strokeStyle = "#d946ef";
  ctx.lineCap = "round";

  /**
   * how to refactor
   *  -
   * | |
   *  -
   */
  if (_progressLen < width) {
    ctx.moveTo(0, _border);
    ctx.lineTo(_progressLen, _border);
  } else {
    ctx.moveTo(0, _border);
    ctx.lineTo(width + _border, _border);
  }

  if (_progressLen > width) {
    if (_progressLen < halfPerimeter) {
      ctx.moveTo(width + _border, _border);
      ctx.lineTo(width + _border, halfPerimeter - _progressLen);
    } else {
      ctx.moveTo(width + _border, _border);
      ctx.lineTo(width + _border, halfPerimeter);
    }
  }

  if (_progressLen > halfPerimeter) {
    if (_progressLen < halfPerimeter + width) {
      ctx.moveTo(width + _border, height + _border);
      ctx.lineTo(halfPerimeter + width - _progressLen, height + _border);
    } else {
      ctx.moveTo(width + _border, height + _border);
      ctx.lineTo(0, height + _border);
    }
  }

  if (_progressLen > halfPerimeter + width) {
    if (_progressLen < perimeter) {
      ctx.moveTo(_border, height + _border);
      ctx.lineTo(_border, perimeter - _progressLen);
    } else {
      ctx.moveTo(_border, height + _border);
      ctx.lineTo(_border, 0);
    }
  }
  ctx.stroke();
}
</script>
