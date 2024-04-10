<template>
  <div>
    <label
      :for="name"
      class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >{{ label }} <span class="text-red-500">*</span></label
    >

    <div class="relative">
      <input
        :id="name"
        :name="name"
        :value="modelValue"
        @input="updateValue($event)"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        required
        class="mt-2 appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-600"
      />

      <span
        class="absolute inset-y-0 end-0 grid bottom-1.5 place-content-center px-4 cursor-pointer"
        v-if="type === 'password'"
        @click="togglePassword"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </span>
      <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  label: String,
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  modelValue: [String, Number],
  errorMessage: String,
  autocomplete: {
    type: String,
    default: "off",
  },
  onlyNumbers: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement;
  if (props.onlyNumbers) {
    input.value = input.value.replace(/\D/g, "");
  }
  emit("update:modelValue", input.value);
}

const inputType = ref(props.type);
function togglePassword() {
  inputType.value = inputType.value === "password" ? "text" : "password";
}
</script>
