<template>
  <div class="relative w-full flex flex-col p-16">
    <div>
      <Link href="/">
      <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" class="absolute right-20 top-5 mr-2 h-7 w-7 cursor-pointer
            text-gray-400 dark:text-indigo-500">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M18 6L6 18M6 6l12 12"></path>
      </svg>
      </Link>
      <h1 class="m-4 text-3xl text-indigo-500 ml-0 ">English Course</h1>
    </div>
    <div class="h-full overflow-y-auto scrollbar-hide">
      <Loading v-if="!courses.length" />
      <ul v-else class="flex gap-14 flex-wrap p-1 overflow-y-auto md:justify-start justify-center">
        <template v-for="course in courses" :key="course.id">
          <li>
            <NuxtLink class="truncate" :href="`/main/${course.id}`">
              <div class="w-52 h-24 bg-indigo-500 rounded-md p-1 
                shadow-lg hover:bg-indigo-700  cursor-pointer 
                flex justify-center items-center transition-colors text-slate-200">
                {{ course.title }}
              </div>
            </NuxtLink>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Course } from '~/store/course';
import { fetchCourses } from '~/api/course';
import Loading from '~/components/Loading.vue'

const courses = ref<Course[]>([])

onMounted(async () => {
  courses.value = await fetchCourses()
})

</script>
