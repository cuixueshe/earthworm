<!-- 临时路由 提醒老用户去重新注册 -->
<!-- 一周后需要删除 -->
<template>
  <div class="flex w-full flex-col pt-2">
    <div class="flex h-3/4 flex-col items-center justify-center text-3xl">
      <div class="text-left">
        <p>尊敬的用户, 我们希望您一切安好。</p>
        <p>
          为了提供更加优质的服务体验，并增强课程内容的丰富性，我们兴奋地宣布我们的平台正进行重大更新。
        </p>
        <p>这项更新将引入多课程包设计，同时增加邮箱注册功能，以进一步保护您的隐私安全。</p>
        <p>
          为了顺利过渡到这一新的系统，我们不得不做出艰难的决定——重置现有的用户数据。我们深知这可能会给您带来不便，对此我们深感抱歉，并诚挚地请求您的理解与支持。
        </p>
        <p>
          我们邀请您重新注册我们的更新后平台，体验全新的功能。请知悉，我们将不遗余力地为您提供一个更安全、更个性化的学习环境。
        </p>
        <p>注册过程简便快捷，只需几分钟即可完成。</p>
        <p>再次感谢您的耐心和理解。我们期待继续为您服务，并见证您的学习旅程。</p>
        <p>更多的课程内容已经在路上了 💗</p>
      </div>
      <button
        class="btn btn-secondary btn-active btn-lg mt-7"
        @click="signIn()"
      >
        去注册
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signIn } from "~/services/auth";
</script>

<style scoped></style>
