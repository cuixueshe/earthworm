<template>
  <div>
    <label
      :for="name"
      class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >{{ label }} <span class="text-red-500">*</span></label
    >
    <div
      class="mt-2 flex items-center justify-center px-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm cursor-text"
      :class="{
        'border-indigo-500 ring-indigo-500 ring-2': isFocused,
      }"
    >
      <input
        :id="name"
        :name="name"
        :value="modelValue"
        @input="updateValue($event)"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :placeholder="placeholder"
        class="appearance-none w-full py-1.5 h-full placeholder-gray-400 text-sm border-0 bg-none bg-transparent text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none shadow-[0_0_0px_1000px_white_inset] dark:shadow-[0_0_0px_1000px_rgba(55,65,81,1)_inset]"
        :autocomplete="autocomplete"
        required
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <!-- input-password-show-icon -->
      <i
        v-if="showPwdVisible"
        class="h-full cursor-pointer pl-1"
        @click="passwordVisible = !passwordVisible"
      >
        <component :is="passwordIcon" />
      </i>
    </div>

    <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";

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
  showPassword: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);
const passwordVisible = ref(false);

const showPwdVisible = computed(() => props.showPassword && !!props.modelValue);

const IconView = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 32 32",
      class: "size-4 text-gray-400",
    },
    [
      h("circle", {
        cx: "16",
        cy: "16",
        r: "4",
        fill: "currentColor",
      }),
      h("path", {
        fill: "currentColor",
        d: "M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z",
      }),
    ]
  );

const IconHide = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 32 32",
      class: "size-4 text-gray-400",
    },
    [
      h("path", {
        fill: "currentColor",
        d: "M30.94 15.66a16.4 16.4 0 0 0-5.73-7.45L30 3.41L28.59 2L2 28.59L3.41 30l5.1-5.09A15.38 15.38 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68zM16 22.5a6.46 6.46 0 0 1-3.83-1.26L14 19.43A4 4 0 0 0 19.43 14l1.81-1.81A6.49 6.49 0 0 1 16 22.5zm-11.47-.69l5-5A6.84 6.84 0 0 1 9.5 16A6.51 6.51 0 0 1 16 9.5a6.84 6.84 0 0 1 .79.05l3.78-3.77A14.39 14.39 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68a15.86 15.86 0 0 0 3.47 5.47z",
      }),
    ]
  );

const passwordIcon = computed(() => {
  return passwordVisible.value ? IconHide : IconView;
});

function updateValue(event: Event) {
  const input = event.target as HTMLInputElement;
  if (props.onlyNumbers) {
    input.value = input.value.replace(/\D/g, "");
  }
  emit("update:modelValue", input.value);
}
</script>
