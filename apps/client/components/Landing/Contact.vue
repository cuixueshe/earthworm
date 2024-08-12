<template>
  <footer id="contact">
    <div class="mx-auto max-w-screen-xl space-y-6 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div>
          <div class="flex items-center">
            <img
              width="48"
              height="48"
              class="mr-6 overflow-hidden rounded-md"
              src="/logo.png"
              alt="earth-worm-logo"
            />
            <span class="mt-4 text-3xl">Earthworm</span>
          </div>

          <p class="typing mt-4 max-w-[16rem] text-base leading-relaxed">
            一起来加入我们
            <span
              class="bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 bg-clip-text text-transparent dark:from-purple-600 dark:to-gray-100"
              >Earthworm</span
            >!
          </p>

          <ul class="mt-6 flex gap-6 transition">
            <li>
              <a
                href="https://x.com/cui_xiaorui"
                rel="noreferrer"
                target="_blank"
              >
                <span class="sr-only">Twitter</span>
                <UIcon
                  name="i-simple-icons-x"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
            <li>
              <a
                href="https://t.me/+dohhXSz-5n1kZDQ1"
                rel="noreferrer"
                target="_blank"
              >
                <UIcon
                  name="i-simple-icons-telegram"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/cuixueshe/earthworm"
                rel="noreferrer"
                target="_blank"
              >
                <UIcon
                  name="i-simple-icons-github"
                  class="icon-link icon-link-gray"
                ></UIcon>
              </a>
            </li>
          </ul>
        </div>

        <div class="grid grid-cols-1 gap-6 transition sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
          <div>
            <p class="text-lg font-medium">Earthworm</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm"
                  class="hover:opacity-80"
                >
                  开源
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm/issues"
                  class="hover:opacity-80"
                >
                  问题
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm/issues/91"
                  class="hover:opacity-80"
                >
                  贡献代码
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-lg font-medium">团队</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://t.me/+dohhXSz-5n1kZDQ1"
                  class="hover:opacity-80"
                >
                  联系我们
                </a>
              </li>

              <!-- <li>
                <a
                  href="#faq"
                  class="transition hover:opacity-75"
                >
                  常见问题
                </a>
              </li> -->
            </ul>
          </div>

          <!-- <div>
            <p class="font-medium text-lg">教学</p>

            <ul class="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href="https://github.com/cuixueshe/earthworm"
                  class="transition hover:opacity-75"
                >
                  关于我们
                </a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.icon-link {
  @apply h-6 w-6 self-start;
}

.icon-link-gray {
  @apply text-gray-500 hover:text-black dark:hover:text-gray-300;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-cursor {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: rgba(228, 110, 255, 0.75);
  }
}

.typing {
  overflow: hidden;
  border-right: 0.25em solid rgba(228, 110, 255, 0.75);
  white-space: nowrap;
  letter-spacing: 0.15em;
  animation:
    typing 3.5s steps(40, end),
    blink-cursor 0.75s step-end infinite;
}
</style>
