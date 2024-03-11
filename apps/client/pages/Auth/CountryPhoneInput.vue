<template>
  <div class="flex flex-col">
    <label
      for="phone"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Phone <span class="text-red-500">*</span>
    </label>
    <div class="mt-2 flex rounded-md shadow-sm relative">
      <select
        v-model="selectedCountry"
        @change="emitUpdate"
        class="rounded-l-md border border-gray-300 shadow-sm text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none block px-3 py-1.5 text-sm focus:outline-none"
      >
        <option
          v-for="country in countries"
          :key="country.iso2"
          :value="country.iso2"
        >
          {{ country.flag }} (+{{ country.dialCode }})
        </option>
      </select>

      <div class="flex-1 relative">
        <input
          type="tel"
          v-model="phoneNumber"
          @input="emitUpdate"
          placeholder="Your phone number"
          class="rounded-r-md border border-gray-300 shadow-sm text-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none block w-full px-3 py-1.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:bg-blue-50 dark:focus:bg-gray-600 -ml-px"
        />
      </div>
    </div>
    <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { allCountries as countriesData } from "country-telephone-data";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  errorMessage: String,
});
const countries = ref(
  countriesData.map((country) => ({
    ...country,
    flag: countryCodesToFlagEmoji(country.iso2),
  }))
);
const selectedCountry = ref(countries.value[46].iso2);
const phoneNumber = ref("");
const selectedCountryDialCode = computed(() => {
  const country = countries.value.find((c) => c.iso2 === selectedCountry.value);
  return country ? country.dialCode : "";
});
watch(
  () => props.modelValue,
  (newVal) => {
    const justNumber = newVal
      .replace(`+${selectedCountryDialCode.value}`, "")
      .trim();
    phoneNumber.value = justNumber;
  }
);
function emitUpdate() {
  const fullPhoneNumber = `+${selectedCountryDialCode.value}${phoneNumber.value}`;
  emit("update:modelValue", fullPhoneNumber);
}
function countryCodesToFlagEmoji(iso2) {
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}
</script>
