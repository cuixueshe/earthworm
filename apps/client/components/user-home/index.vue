<template>
  <div class="mt-8 flex w-full justify-between">
    <!-- 左侧头像区域 -->
    <div class="mr-16 hidden w-72 md:block">
      <div
        class="mx-auto h-56 w-56 overflow-hidden rounded-full border-2 border-gray-300 bg-gray-300 dark:border-gray-700 dark:bg-gray-700"
      >
        <!-- 通过给定高度来自适应拉伸图片，如果图片不存在或者加载失败则显示外层的背景色（没有宽度） -->
        <img
          class="h-full object-cover"
          :src="user?.avatar"
        />
      </div>
      <div class="mt-4 truncate">
        <div class="text-3xl font-medium">{{ user?.username }}</div>
        <div class="text-md text-gray-400">
          {{ user?.name }}
        </div>
      </div>
      <hr class="my-5 dark:border-gray-700" />
      <!-- TODO: 等后续勋章制作完成再放出来 -->
      <!-- <div class="text-lg font-medium">勋章</div>
      <div class="mt-2 grid grid-cols-4 gap-2">
        <div
          v-for="i in 6"
          class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"
        ></div>
      </div> -->
    </div>

    <!-- 右侧课程包区域 -->
    <div class="min-w-0 flex-1">
      <div class="mb-4 flex justify-between border-b pb-2 dark:border-gray-700">
        <div class="text-xl font-medium">最近使用的课程包</div>
        <NuxtLink
          v-if="isSelf"
          href="/course-pack"
          class="link text-blue-500 no-underline hover:opacity-75"
        >
          更多课程包
        </NuxtLink>
      </div>
      <RecentCoursePack :userId="user?.id" />
      <CalendarGraph
        class="mt-10"
        :data="learnRecord.list"
        :totalCount="learnRecord.totalCount"
        @toggleYear="onToggleYear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getUserByUsername } from "~/api/user";
import { useLearnRecord } from "~/composables/learnRecord";
import { useUserStore } from "~/store/user";
import CalendarGraph from "./CalendarGraph.vue";
import RecentCoursePack from "./RecentCoursePack.vue";

const props = defineProps<{
  username: string;
}>();

const user = await getUserByUsername(props.username);

const isSelf = useUserStore().isSelf(() => user?.id);
const { learnRecord, year } = useLearnRecord({ userId: user?.id });

const onToggleYear = (value?: number) => {
  if (!value) {
    return;
  }
  year.value = value!;
};
</script>

<style scoped></style>
