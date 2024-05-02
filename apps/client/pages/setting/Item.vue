<script lang="ts" setup>
interface RadioOption {
  label: string;
  value: string;
}

defineProps<{
  title: string;
  mode: "checkbox" | "radio" | "kbd";
  value: boolean | string | string[];
  options?: RadioOption[];
}>();

const emits = defineEmits(["change", "open"]);
</script>

<template>
  <div
    class="box-border grid grid-cols-2 border-b border-b-slate-100 py-2 text-base hover:bg-slate-50 dark:hover:bg-slate-800 md:p-3"
  >
    <div class="label-text flex items-center">{{ title }}</div>

    <template v-if="mode === 'radio'">
      <div class="join ml-auto">
        <input
          type="radio"
          v-for="mode in options"
          class="btn join-item btn-sm"
          :value="mode.value"
          :aria-label="mode.label"
          :checked="value === mode.value"
          @change="$emit('change', mode.value)"
        />
      </div>
    </template>

    <template v-else-if="mode === 'checkbox'">
      <input
        type="checkbox"
        class="toggle toggle-secondary ml-auto"
        :checked="value as boolean"
        @change="$emit('change')"
      />
    </template>

    <template v-else>
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <div
            class="kbd text-xs"
            v-for="key in value as string[]"
            :key="key"
          >
            {{ key }}
          </div>
        </div>

        <button
          class="btn btn-outline btn-secondary btn-sm"
          @click="$emit('open')"
        >
          编辑
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.btn-outline.btn-secondary:hover,
.toggle-secondary:checked,
.btn:is(input[type="radio"]:checked) {
  @apply border-fuchsia-500 bg-fuchsia-500 text-[#ffffff];
}

.btn-outline.btn-secondary {
  @apply text-fuchsia-500 outline-fuchsia-500;
}
</style>
