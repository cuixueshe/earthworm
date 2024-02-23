<template>
    <div>
        <label :for="name" class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{{ label }} <span
                class="text-red-500">*</span></label>
        <input :id="name" :name="name" :value="modelValue" @input="updateValue($event)" :type="type"
            :placeholder="placeholder" class="mt-2 appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm
        placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none
        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50
        dark:focus:bg-gray-600" :autocomplete="autocomplete" required>
        <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">{{ errorMessage }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: String,
    name: String,
    type: {
        type: String,
        default: 'text',
    },
    placeholder: String,
    modelValue: [String, Number],
    errorMessage: String,
    autocomplete: {
        type: String,
        default: 'off',
    },
});

const emit = defineEmits(['update:modelValue']);

function updateValue(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>