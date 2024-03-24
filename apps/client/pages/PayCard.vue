<template>
  <div class="flex justify-center items-center min-h-screen p-6 space-x-12">
    <!-- Free Card -->
    <div
      class="card free w-96 max-w-sm p-8 shadow-xl border-transparent relative"
    >
      <div class="mb-6 text-left">
        <h2 class="text-3xl font-bold text-gradient">Free</h2>
        <p class="program-description">Access to basic spaces.</p>
      </div>
      <div class="mb-8 text-left">
        <span class="text-4xl font-extrabold dark:text-white text-black mr-2"
          >$0</span
        >
        <span class="gradient-text">Access Now</span>
      </div>
      <div class="text-left">
        <button
          class="w-full px-8 py-3 font-bold bg-gray-600 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-700"
        >
          Get Started
        </button>
      </div>
    </div>
    <!-- Lifetime Card -->
    <div
      class="card lifetime w-96 max-w-sm p-8 shadow-xl border-transparent relative"
    >
      <div class="mb-6 text-left">
        <h2 class="text-3xl font-bold text-gradient">Lifetime</h2>
        <p class="program-description">
          A variety of customized programs to support your English program in
          all aspects!
        </p>
      </div>
      <div class="mb-8 text-left">
        <span class="text-4xl font-extrabold dark:text-white text-black mr-2"
          >$19</span
        >
        <span class="gradient-text">Early Access</span>
      </div>
      <div class="text-left">
        <button
          class="w-full px-8 py-3 font-bold bg-purple-600 text-white transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-700"
        >
          Upgrade now
        </button>
        <div
          class="mt-4 text-sm text-black dark:text-gray-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-green-500 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          Congratulations on making a great choice!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script setup area
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
