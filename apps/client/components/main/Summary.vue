<template>
  <div>
    <n-modal v-model:show="showModal" transform-origin="center">
      <n-card
        style="width: 800px; height: 400px"
        title="结算面板"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        不错不错 又学到了那么多句子和单词 加油 坚持就是胜利:)
        <template #footer>
          <div class="flex">
            <n-button @click="handleDoAgain">再来一次</n-button>
            <n-button @click="handleToNextCourse">开始下一课</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useCoursesStore } from "~/store/courses";
import { useSummary } from "./summary";
import { useMode } from "./game";

const coursesStore = useCoursesStore();
const { showQuestion } = useMode();
const { showModal, hideSummary } = useSummary();
const router = useRouter();

function handleDoAgain() {
  coursesStore.doAgain();
  hideSummary();
  showQuestion();
}

async function handleToNextCourse() {
  const course = await coursesStore.toNextCourse(
    +router.currentRoute.value.params.id
  );
  router.push(`/main/${course.value.id}`);
  hideSummary();
  showQuestion();
}
</script>

<style scoped></style>
