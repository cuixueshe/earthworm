<template>
  <div class="container w-full mb-14">
    <!-- notice bar -->
    <NoticeBar v-if="showNoticeBar" />
    <!-- nav -->
    <header
      class="sticky top-0 bg-transparent bg-opacity-50 backdrop-blur-xl z-50"
    >
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <NuxtLink to="/">
            <div class="logo flex items-center">
              <img
                width="48"
                height="48"
                class="rounded-md overflow-hidden mr-6"
                src="/logo.png"
                alt="earth-worm-logo"
              />
              <h1
                class="text-purple-500 text-3xl font-black font-extrabold leading-normal text-wrap"
              >
                Earthworm
              </h1>
            </div>
          </NuxtLink>

          <div class="md:flex md:items-center md:gap-12">
            <nav
              aria-label="Global"
              class="hidden md:block"
            >
              <ul class="flex items-center text-md gap-8">
                <template
                  v-for="(opt_item, opt_index) in HEADER_OPTIONS"
                  :key="opt_index"
                >
                  <li>
                    <a
                      class="text-gray-500 transition hover:text-gray-500/75 dark:text-white"
                      :href="`#${opt_item.anchor}`"
                    >
                      {{ opt_item.name }}
                    </a>
                  </li>
                </template>
              </ul>
            </nav>

            <div class="logged-in">
              <div class="mx-2">{{ userStore.user?.username }}</div>
              <div
                v-if="userStore.user"
                class="dropdown dropdown-end"
              >
                <button
                  tabindex="0"
                  class="h-8 btn btn-sm btn-ghost rounded-md mx-0 px-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </button>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                >
                  <li @click="handleViewUserInfo"><a>User Info</a></li>
                  <li @click="handleLogout"><a>Log out</a></li>
                </ul>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="sm:flex sm:gap-4">
                <button
                  v-show="
                    !userStore.user &&
                    (route.name === 'Auth-SignUp' ||
                      route.name !== 'Auth-Login')
                  "
                  class="rounded-md bg-purple-400 px-5 py-2.5 text-sm font-medium text-white shadow"
                  @click="handleLogin"
                >
                  Login
                </button>

                <div class="hidden sm:flex">
                  <button
                    v-show="route.name === 'Auth-Login'"
                    class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-purple-400"
                    @click="handleSignup"
                  >
                    Register
                  </button>
                </div>
              </div>

              <button
                class="btn btn-sm btn-ghost rounded-md mx-1 w-8 h-8 p-0"
                @click="toggleDarkMode"
              >
                <svg
                  v-if="isDarkMode"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98m-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- header -->
    <section class="text-gray-500" id="home">
      <div class="mx-auto w-full px-4 py-16 lg:flex">
        <div class="mx-auto text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            An Friendly English learning tool.
          </p>

          <p class="mx-auto mt-4 max-w-2xl sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              class="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-gray-500 hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- introduce img/video -->
    <div class="w-full flex justify-center">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        class="w-3/4 object-cover sm:h-80 lg:h-96 border"
      />
    </div>
    <Divider />
    <!-- what is earthworm -->
    <div
      class="w-full flex-col"
      id="what"
    >
      <div class="mx-auto max-w-screen-xl px-4 py-16 lg:flex">
        <div class="mx-auto max-w-3xl text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            What is Earthworm?
          </p>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            an open-source, collaborative, user-friendly English learning tool.
          </p>
        </div>
      </div>
      <section class="flex flex-col py-8">
        <div class="flex">
          <div
            class="w-1/2 mx-2 my-8 transition duration-300 border rounded-3xl dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 dark:from-neutral-600/90 dark:to-neutral-450/90 hover:shadow-2xl"
          >
            <div class="h-[360px] flex flex-col pt-4 pl-4 pb-4 text-sm">
              <div class="pr-2 overflow-x-hidden overflow-y-auto">
                <h2 class="py-4 text-xl font-bold">快速上手</h2>
                <h3 class="pb-2 text-base font-semibold">当前页面</h3>
                <p class="py-1">
                  点击按钮
                  <span
                    class="inline-block px-1 mx-1 border border-solid rounded-lg text-fuchsia-300 border-fuchsia-300"
                    >Get Started</span
                  >
                  <span class="text-gray-500">（或快捷键 Enter ⏎）</span>
                  开启你的第一节课！
                </p>
                <h3 class="py-2 text-base font-semibold">答题页面</h3>
                <p class="py-1 leading-7">
                  看到
                  <span class="text-fuchsia-500">紫色下划线</span>
                  亮起，输入单词，按下空格键
                  <span class="text-gray-500">（Space ␣）</span>
                  向后切换单词，待输入完成后再按下回车键
                  <span class="text-gray-500">（Enter ⏎）</span>
                  来提交题目
                </p>
                <p class="py-1 leading-7">
                  题目提交后若出现
                  <span class="text-red-500">红色</span>
                  单词和下划线显示，代表这部分单词存在某些错误需要更正，此时可按下空格键
                  <span class="text-gray-500">（Space ␣）</span>
                  快速定位到第一个错误单词并清空，完成更改后再按一次空格继续定位到下个错词
                </p>
                <p class="py-1 leading-7">
                  此时若发现上个错词未正确修改，可按下退格键
                  <span class="text-gray-500">（Backspace ⌫）</span>
                  来回退到上一个错词，直到所有错词被更正完成，按下回车键提交即可
                </p>
                <p class="py-1 leading-7">
                  验证通过后会显示答案页面，同时会播放对应题目语音用于辅助记忆。
                </p>
                <h3 class="py-2 text-base font-semibold">答题小技巧</h3>
                <p class="py-1 leading-7">
                  底部提示面板的按钮
                  <a
                    class="ml-1 text-[#3498db] hover:text-fuchsia-500"
                    href="https://www.bilibili.com/video/BV1py421q7Mp/"
                  >
                    👉 一分钟点我快速了解</a
                  >
                </p>
                <p class="p-1">
                  <button class="instruction-btn">⌃ Ctrl+'</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+'）</span>
                  播放题目语音
                </p>
                <p class="p-1">
                  <button class="instruction-btn">⌃ Ctrl+;</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+;）</span>
                  显示题目答案
                </p>
                <h3 class="py-2 text-base font-semibold">答案页面</h3>
                <p class="py-1 leading-7">答案下方的按钮</p>
                <p class="py-1">
                  <button class="instruction-btn">again</button>
                  <span class="text-gray-500">（或快捷键 Ctrl+;）</span>
                  再来亿次，怎能不会！
                </p>
                <p class="py-1">
                  <button class="instruction-btn">next</button>
                  <span class="text-gray-500">（或快捷键 Enter）</span>
                  下一题，冲冲冲霸占榜首！🏄‍♂️
                </p>

                <h2 class="py-4 text-xl font-bold">帮助</h2>
                <h3 class="pb-2 text-base font-semibold">课程页面</h3>
                <p class="py-1 leading-7">
                  输入下划线全是灰色，没有
                  <span class="text-fuchsia-500">紫色</span>
                  亮起时无法输入，需要你动动小手移动鼠标点击输入框进行聚焦哦~
                </p>
                <h3 class="py-2 text-base font-semibold">用户设置页面</h3>
                <p class="py-1 leading-7">
                  右上角图标进入 User Info
                  切换到设置页面，自定义你喜欢的快捷键，也可以控制语音是否自动播放、单词下划线固定长度、使用空格提交等等……更多个人设置会持续更新
                  😊
                  <i
                    class="animate-wink inline w-1 h-8 dark:bg-white bg-slate-900 mx-2 text-sm p-[2px]"
                  ></i>
                </p>
              </div>
            </div>
          </div>
          <div
            class="w-1/2 mx-2 my-8 transition duration-300 border rounded-3xl dark:border-slate-600 bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 dark:from-neutral-600/90 dark:to-neutral-450/90 hover:shadow-xl"
          >
            <div class="h-[360px] flex flex-col pt-4 pl-4 pb-4 text-sm">
              <div class="pr-2 overflow-x-hidden overflow-y-auto">
                <h2 class="py-4 text-xl font-bold">
                  学习原理：通过连词造句的方法来练习英语 😄
                </h2>
                <h3 class="pb-2 text-base font-semibold">以句子为核心</h3>
                <p class="py-1">
                  每个句子包含单词/词组/语法，所以学会一个句子后，就可以清晰地表达出来。
                </p>
                <h3 class="py-2 text-base font-semibold">任务拆分</h3>
                <p class="py-1 leading-7">
                  将一个长难句拆分成一个个的小单元（单词/词组）
                </p>
                <h3 class="py-2 text-base font-semibold">重复</h3>
                <p class="py-1 leading-7">通过不断地重复来形成肌肉记忆</p>
                <h3 class="py-2 text-base font-semibold">i+1</h3>
                <p class="py-1 leading-7">
                  循序渐进的增加难度，先从最简单的句型开始，再到更加丰富的概念
                </p>
                <h3 class="pb-2 text-base font-semibold">正向反馈来的快</h3>
                <p class="py-1 leading-7">
                  当自己可以写出长难句时，会非常有成就感，所以也会越学越想学。打破了传统且非常痛苦的英语学习方案
                  ——背单词（还记得 abandon 吗？ oh 不，现在是 aback 了）
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/2"></div>
        <div class="w-1/2"></div>
      </section>
    </div>
    <Divider />
    <!-- user feedback -->
    <section class="flex flex-col py-4">
      <div class="mx-auto max-w-screen-xl py-8 sm:px-6 lg:px-8 lg:py-12">
        <div class="mx-auto max-w-3xl text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            User feedback
          </p>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            If you're using Earthworm, feel free to give us your feedback on
            Twitter.
          </p>
        </div>
        <div class="mt-8 sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          <div
            v-for="(item, index) in CommentsList"
            :key="index"
            class="mb-8 sm:break-inside-avoid"
          >
            <blockquote
              class="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-700 cursor-pointer hover:shadow-purple-500/50 dark:hover:shadow-blue-400/50"
            >
              <div class="flex flex-col justify-between h-full p-6">
                <div class="flex items-center gap-4">
                  <img
                    :src="item.avatar"
                    alt=""
                    class="h-14 w-14 rounded-full object-cover border-2 border-purple-400 p-1"
                  />
                  <div class="flex-grow">
                    <p class="mt-0.5 text-lg font-bold dark:text-white">
                      {{ item.nickname }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ "@" + item.account }}
                    </p>
                  </div>
                  <img
                    width="30"
                    :src="item.icon"
                    class="self-start"
                  />
                </div>
                <p class="mt-4 text-gray-700 dark:text-gray-300">
                  {{ item.comment }}
                </p>
                <div class="flex items-center justify-between my-2">
                  <div class="text-gray-500 text-xs">
                    {{ formatTimestamp({ timestamp: item.time }) }}
                  </div>
                </div>
                <div class="mx-auto my-4"></div>
                <div class="flex items-center justify-between text-xs mt-4">
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 mr-2 fill-current text-pink-300 dark:text-blue-300"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                    <span class="text-gray-500 dark:text-gray-400"
                      >{{ item.likeCount }} likes</span
                    >
                  </div>
                  <a
                    :href="item.link"
                    class="text-blue-500 dark:text-blue-400"
                    tabindex="-1"
                    aria-disabled="true"
                    style="pointer-events: none"
                    >See {{ item.account }}'s</a
                  >
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
    <Divider />
    <!-- features -->
    <div
      class="w-full flex-col"
      id="features"
    >
      <div class="mx-auto max-w-screen-xl px-4 py-16 lg:flex">
        <div class="mx-auto max-w-3xl text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            Dive into powerful features
          </p>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Take your tab management to the next level with these powerful
            features
          </p>
        </div>
      </div>
      <section class="text-gray-500">
        <div
          class="grid grid-cols-1 gap-8 md:mt-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3"
        >
          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <span class="shrink-0 rounded-lg bg-gray-800 p-4">
              <svg
                class="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                ></path>
              </svg>
            </span>

            <div>
              <h2 class="text-lg font-bold">Lorem, ipsum dolor.</h2>

              <p class="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                cumque tempore est ab possimus quisquam reiciendis tempora
                animi! Quaerat, saepe?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Divider />
    <!-- pay -->
    <div
      class="w-full"
      id="pricing"
    >
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="mx-auto max-w-3xl text-center">
            <p
              class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
            >
              Upgrade to Earthworm Pro
            </p>

            <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              On the Earthworm Pro version, you can have unlimited access to all
              content, new features, priority experience of new courses, such as
              custom upload files, review error statements, unlock more courses,
              and so on.
            </p>
          </div>
          <div class="flex flex-wrap justify-between">
            <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div
                class="h-full p-6 flex flex-col relative overflow-hidden gradient-border"
              >
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium"
                  >START</h2
                >
                <h1
                  class="text-5xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent"
                  >Free</h1
                >
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Vexillologist pitchfork
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Tumeric plaid portland
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Mixtape chillwave tumeric
                </p>
                <button
                  class="flex items-center mt-auto text-gray-500 border py-2 px-4 w-full focus:outline-none hover:bg-gray-100 rounded"
                  >Get started for Free
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div
                class="h-full p-6 rounded-lg gradient-border flex flex-col relative overflow-hidden"
              >
                <span
                  class="text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                  >POPULAR</span
                >
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium"
                  >PRO</h2
                >
                <h1
                  class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
                >
                  <span
                    class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent"
                    >$38</span
                  >
                  <span class="text-lg ml-1 font-normal text-gray-500"
                    >/mo</span
                  >
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Vexillologist pitchfork
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Tumeric plaid portland
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Hexagon neutra unicorn
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Mixtape chillwave tumeric
                </p>
                <button
                  class="flex items-center mt-auto text-white border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-500-600 rounded bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                  >Buy now
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-4 xl:w-1/3 md:w-1/2 w-full">
              <div
                class="h-full p-6 rounded-lg gradient-border flex flex-col relative overflow-hidden"
              >
                <h2 class="text-sm tracking-widest title-font mb-1 font-medium"
                  >BUSINESS</h2
                >
                <h1
                  class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200"
                >
                  <span
                    class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent"
                    >$56</span
                  >
                  <span class="text-lg ml-1 font-normal text-gray-500"
                    >/mo</span
                  >
                </h1>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Vexillologist pitchfork
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Tumeric plaid portland
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Hexagon neutra unicorn
                </p>
                <p class="flex items-center text-gray-600 mb-2">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Vexillologist pitchfork
                </p>
                <p class="flex items-center text-gray-600 mb-6">
                  <span
                    class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-green-500 text-white rounded-full flex-shrink-0"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      class="w-3 h-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg> </span
                  >Mixtape chillwave tumeric
                </p>
                <button
                  class="flex items-center mt-auto text-white border-0 py-2 px-4 w-full focus:outline-none hover:bg-green-500-600 rounded bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                  >Buy now
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-auto"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Divider />
    <!-- question -->
    <section
      class="text-gray-600 body-font overflow-hidden"
      id="faq"
    >
      <div class="container px-5 py-24 mx-auto">
        <div class="mx-auto max-w-3xl text-center">
          <p
            class="w-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent s-5xl leading-30"
          >
            Frequently Asked Questions
          </p>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            If you can't find what you're looking for, email our support team
            and if you're lucky someone will get back to you.
          </p>
        </div>
        <div class="flex flex-wrap -m-4 mt-20">
          <div class="-my-8 divide-y divide-gray-100 w-full">
            <details
              class="group py-8 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary class="flex cursor-pointer items-center justify-between">
                <h2 class="text-lg font-medium"
                  >How to give priority to the latest version?</h2
                >

                <span class="relative size-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>

              <p class="mt-4 leading-relaxed text-gray-700">
                If you are our Pro user, use xxx-> xxx to update the API. Thank
                you.
              </p>
            </details>

            <details
              class="group py-8 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                class="flex cursor-pointer items-center justify-between gap-1.5"
              >
                <h2 class="text-lg font-medium"
                  >Will there be an one-to-one service if you buy the Pro
                  version??</h2
                >

                <span class="relative size-5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute inset-0 size-5 opacity-100 group-open:opacity-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute inset-0 size-5 opacity-0 group-open:opacity-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </summary>

              <p class="mt-4 leading-relaxed text-gray-700">
                At present, for our Pro users, we have special customer service
                personnel to dock with you to help you solve all your problems.
                Thank you.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
    <Divider />
    <!-- footer -->
    <footer id="contact">
      <div
        class="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8"
      >
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img
              width="48"
              height="48"
              class="rounded-md overflow-hidden mr-6"
              src="/logo.png"
              alt="earth-worm-logo"
            />

            <p class="mt-4 max-w-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul class="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="transition hover:opacity-75"
                >
                  <span class="sr-only">Facebook</span>

                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="transition hover:opacity-75"
                >
                  <span class="sr-only">Instagram</span>

                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="transition hover:opacity-75"
                >
                  <span class="sr-only">Twitter</span>

                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="transition hover:opacity-75"
                >
                  <span class="sr-only">GitHub</span>

                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  class="transition hover:opacity-75"
                >
                  <span class="sr-only">Dribbble</span>

                  <svg
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4"
          >
            <div>
              <p class="font-medium">Services</p>

              <ul class="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    1on1 Coaching
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Company Review
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Accounts Review
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    HR Consulting
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    SEO Optimisation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium">Company</p>

              <ul class="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Meet the Team
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Accounts Review
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium">Helpful Links</p>

              <ul class="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Contact
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    FAQs
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-medium">Legal</p>

              <ul class="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Accessibility
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Returns Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Refund Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="transition hover:opacity-75"
                  >
                    Hiring Statistics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <MessageBox
    v-model:isShowModal="isShowModal"
    title="Notice"
    content="Are you sure to exit?"
    @confirm="handleLogoutConfirm"
  />
</template>

<script setup>
import { navigateTo } from "nuxt/app";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

// theme
import { Theme, useDarkMode } from "~/composables/darkMode";
const { setDarkMode, toggleDarkMode, darkMode } = useDarkMode();
const isDarkMode = computed(() => darkMode.value === Theme.DARK);

// userStore
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

// login
import MessageBox from "~/components/main/MessageBox/MessageBox.vue";
const isShowModal = ref(false);
const handleLogin = () => {
  navigateTo("/auth/login");
};

const handleSignup = () => {
  navigateTo("/auth/signup");
};

const handleLogout = () => {
  isShowModal.value = true;
};

// user feedback
import CommentsList from "~/assets/comments";
import { formatTimestamp } from "~/utils/date";

// Notice Bar
import NoticeBar from "./components/NoticeBar.vue";
const showNoticeBar = ref(false);

// Header
const HEADER_OPTIONS = [
  { name: "Home", anchor: "home" },
  { name: "What", anchor: "what" },
  { name: "Features", anchor: "features" },
  { name: "Pricing", anchor: "pricing" },
  { name: "FAQ", anchor: "faq" },
  { name: "Contact", anchor: "contact" },
];

// dividers
import Divider from "./components/Divider.vue";
</script>

<style scoped>
.s-5xl {
  font-size: 3rem;
}
.gradient-border {
  border: 2px solid;
  border-image: linear-gradient(to right, #00ff00, #0000ff, #800080) 1;
  border-image-slice: 1;
}
</style>
