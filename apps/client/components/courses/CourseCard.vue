<template>
  <div class="
        flex
        flex-col
        w-[360px]
        h-[160px]
        sm:w-[500px]
        md:w-[340px]
        lg:w-[280px]
        xl:w-[260px]
        p-4 
        pb-6
        border
        border-slate-400
        rounded-xl
        hover:shadow-lg
        hover:shadow-purple-400/50
        hover:border-purple-400
        transition-all
        duration-500
  ">
    <h3 class="text-xl font-bold dark:text-gray-100">{{ title }}</h3>
    <p class="mt-4 truncate">this is the course's description</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
