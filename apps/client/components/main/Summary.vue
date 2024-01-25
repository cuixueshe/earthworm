<template>
  <div>
    <n-modal v-model:show="showModal" transform-origin="center">
      <n-card style="width: 800px; height: 400px" title="结算面板" :bordered="false" size="huge" role="dialog"
        aria-modal="true">
        不错不错 又学到了那么多句子和单词 加油 坚持就是胜利:)
        <template #footer>
          <div class="flex">
            <n-button @click="handleDoAgain">再来一次</n-button>
            <n-button @click="handleGoToNextCourse">开始下一课</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from "~/store/course";
import { useSummary } from "~/composables/main/summary";
import { useGameMode } from "~/composables/main/game";

const courseStore = useCourseStore();
const { showModal, hideSummary } = useSummary();

const { handleDoAgain } = useDoAgain()
const { handleGoToNextCourse } = useGoToNextCourse()


function useDoAgain() {
  const { showQuestion } = useGameMode();

  function handleDoAgain() {
    courseStore.doAgain();
    hideSummary();
    showQuestion();
  }

  return {
    handleDoAgain
  }

}

function useGoToNextCourse() {
  const { showQuestion } = useGameMode();
  const router = useRouter();

  async function handleGoToNextCourse() {
    await courseStore.goToNextCourse(
      +router.currentRoute.value.params.id
    );

    router.push(`/main/${courseStore.currentCourse?.id}`);
    hideSummary();
    showQuestion();
  }


  return {
    handleGoToNextCourse
  };
}


</script>

<style scoped></style>