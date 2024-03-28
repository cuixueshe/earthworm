<template>
  <div
    class="flex justify-center items-center mt-16 flex-col"
    id="pricing"
  >
    <div class="bg-opacity-75 text-white text-center py-16">
      <div class="mb-6">
        <p
          class="text-lg font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:mb-0 before:bg-gradient-to-r before:from-purple-500"
        >
          Pricing
        </p>
      </div>
      <h2
        class="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-gray-300 dark:from-purple-600 dark:to-gray-500"
      >
        Simple, transparent pricing <br />
        for everyone
      </h2>
      <p class="mt-6 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
        <span
          >Pay once, use forever access unlimited spaces. Free updates for
          life.</span
        ><br />
        <span>Customize your services</span>
      </p>
    </div>

    <div class="flex justify-around items-center space-x-20">
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="card w-96 max-w-sm p-8 shadow-xl border-transparent relative"
        :class="{ 'lifetime-animation': feature.type === 'Lifetime' }"
      >
        <div class="mb-6 text-left">
          <h2 class="text-3xl font-bold text-gradient">{{ feature.type }}</h2>
          <p class="program-description">
            {{
              feature.type === "Free"
                ? "There's a lot covered in our basic services, and you can do the Eathworm tour on that too!"
                : "A variety of customized services to support your English course in an all-round way!"
            }}
          </p>
        </div>
        <div class="mb-8 text-left">
          <span class="text-4xl font-extrabold dark:text-white text-black mr-2">
            {{ feature.type === "Free" ? "$0" : "$19" }}
          </span>
          <span class="gradient-text">{{
            feature.type === "Free" ? "Access Now" : "Early Access"
          }}</span>
        </div>
        <div class="text-left">
          <button
            :class="
              feature.type === 'Free'
                ? 'bg-gray-600 hover:bg-gray-700'
                : 'bg-purple-600 hover:bg-purple-700'
            "
            class="w-full px-8 py-3 font-bold text-white transition duration-300 ease-in-out transform hover:scale-105"
          >
            {{ feature.type === "Free" ? "Get Started" : "Upgrade now" }}
          </button>
          <ul class="mt-4">
            <li
              v-for="(item, itemIndex) in feature.list"
              :key="`feature-${index}-item-${itemIndex}`"
              class="flex items-center mt-6 mb-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                :class="item.unique ? 'text-green-500' : 'text-gray-500'"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              {{ item.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-opacity-75 text-white text-center py-10 mt-6">
    <p class="text-xs md:text-sm text-gray-800 dark:text-gray-400">
      Each new purchase is granted <br class="md:hidden" />
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >100% money back within 7 days</span
      >
      from purchase date. <br />
      After you have purchased a license,
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >sign in</span
      >
      and
      <span
        class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-400 to-gray-400 dark:from-purple-600 dark:via-purple-600 dark:to-gray-500"
        >register the license</span
      >
      to unlock all features.
    </p>
  </div>
</template>

<script setup>
const features = [
  {
    type: "Free",
    list: [
      { text: "Up to 5 spaces with cloud sync", unique: false },
      { text: "Up to 1000 URLs with AI Grouping", unique: false },
      { text: "Auto AI Grouping (upcoming)", unique: true },
      { text: "Basic support", unique: true },
      { text: "Free updates for life!", unique: true },
    ],
  },
  {
    type: "Lifetime",
    list: [
      { text: "Unlimited spaces with cloud sync", unique: true },
      { text: "Unlimited URLs with AI Grouping", unique: true },
      { text: "Auto AI Grouping (upcoming)", unique: true },
      { text: "Lifetime Premium support", unique: true },
      { text: "Free updates for life!", unique: true },
    ],
  },
];
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid rgba(138, 100, 226, 0.25);
  transition:
    box-shadow 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    background-color 0.3s ease-in-out; /* 添加背景色过渡 */
  will-change: transform;
}

.card:hover {
  transform: translateY(-5px);
  animation:
    dynamic-shadow 2s infinite alternate,
    pulse 2s infinite alternate;
}
button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

button::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: all 0.3s ease-in-out;
}

button:hover::after {
  left: 100%;
}
@keyframes dynamic-shadow {
  0% {
    box-shadow:
      0 0 10px rgba(139, 92, 246, 0.5),
      0 0 20px rgba(139, 92, 246, 0.4),
      0 0 40px rgba(139, 92, 246, 0.3);
  }
  100% {
    box-shadow:
      0 0 10px rgba(139, 92, 246, 0.7),
      0 0 25px rgba(139, 92, 246, 0.6),
      0 0 55px rgba(139, 92, 246, 0.5);
  }
}

@keyframes pulse {
  0% {
    background-color: rgba(10, 3, 3, 0.05);
  }
  100% {
    background-color: rgba(77, 6, 192, 0.1);
  }
}
.lifetime-animation {
  animation:
    dynamic-shadow 2s infinite alternate,
    pulse 2s infinite alternate;
}
.text-smaller,
.program-description {
  font-size: 0.875rem;
}

.program-description {
  color: #7087aa;
}

.dark .program-description {
  color: #9ca3af;
}

.gradient-text {
  background: linear-gradient(to right, #7e22ce, #e5e7eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.text-gradient {
  background: linear-gradient(to right, #7e22ce, #e5e7eb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
