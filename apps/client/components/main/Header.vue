<template>
  <header class="py-4 px-4">
    <div class="flex justify-between items-center md:max-w-5xl m-auto">
      <div class="flex items-center">
        <div class="mr-4">
          <NuxtImg alt="logo" src="/logo.png" width="48" height="48"></NuxtImg>
        </div>
        <h1 class="text-2xl font-bold text-fuchsia-500">EarthWorm</h1>
      </div>
      <div class="flex gap-4 items-center"></div>
      <NuxtLink href="/courses">更多课程</NuxtLink>
      <!-- <div class="flex gap-4 items-center">
          {session.isLogin && (
            <div>
              {session.username}{" "}
              <a class="text-red-400 cursor-pointer" onClick={handleLogout}>
                退出
              </a>
            </div>
          )} -->
      <!-- {session.isLogin && courseId && courseId !== "1" && (
            <Dialog
              action={
                <div class="text-red-400 cursor-pointer hover:text-red-800">
                  重置进度
                </div>
              }
              title="重置进度"
              description="重置进度后，将会清空所有课程的学习进度，确定要重置吗？"
              confirm={handleResetProgress}
            />
          )} -->
      <!-- <DarkModeBtn /> -->
      <!-- </div> -->
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
