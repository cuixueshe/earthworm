<template>
  <div class="flex flex-col">
    <label
      for="phone"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Phone <span class="text-red-500">*</span>
    </label>
    <div class="mt-2 flex rounded-md shadow-sm relative">
      <div
        @click="toggleDropdown"
        tabindex="0"
        class="rounded-l-md border border-gray-300 shadow-sm text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:z-10 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none block px-3 py-1.5 text-sm focus:outline-none cursor-pointer"
      >
        {{ selectedCountry.flag }} (+{{ selectedCountry.dialCode }})
      </div>
      <div
        v-if="showDropdown"
        class="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mt-10 rounded-md w-full max-h-80 overflow-auto"
      >
        <div
          v-for="country in countries"
          :key="country.iso2"
          @click="selectCountry(country)"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
        >
          {{ country.flag }} (+{{ country.dialCode }}) {{ country.name }}
        </div>
      </div>
      <select
        v-model="selectedCountry.iso2"
        @change="emitUpdate"
        class="hidden"
      >
        <option
          v-for="country in countries"
          :key="country.iso2"
          :value="country.iso2"
        >
          {{ country.flag }} (+{{ country.dialCode }}) {{ country.name }}
        </option>
      </select>

      <div class="flex-1 relative">
        <input
          type="tel"
          v-model="phoneNumber"
          @input="handleInput"
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
import { allCountries as countriesData } from "country-telephone-data";
import { onBeforeUnmount, onMounted, ref } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  errorMessage: String,
});
const specialCountries = new Map([
  ["tw", "中国台湾"],
  ["hk", "中国香港"],
  ["mo", "中国澳门"],
]);
const countries = ref(
  countriesData
    .sort((a, b) => (a.dialCode > b.dialCode ? 1 : -1))
    .map((country) => {
      const specialName = specialCountries.get(country.iso2);
      if (specialName) {
        return {
          ...country,
          name: specialName,
          flag: countryCodesToFlagEmoji(country.iso2),
        };
      } else {
        return {
          ...country,
          flag: countryCodesToFlagEmoji(country.iso2),
        };
      }
    })
);
const defaultCountryIso2 = "cn";
const defaultCountry = countries.value.find(
  (country) => country.iso2 === defaultCountryIso2
);
const selectedCountry = ref(defaultCountry || {});

const phoneNumber = ref("");
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function selectCountry(country) {
  selectedCountry.value = country;
  showDropdown.value = false;
  emitUpdate();
}

function handleInput(event) {
  phoneNumber.value = event.target.value.replace(/\D/g, "");
  emitUpdate();
}

function emitUpdate() {
  const fullPhoneNumber = `+${selectedCountry.value.dialCode}_${phoneNumber.value}`;
  emit("update:modelValue", fullPhoneNumber);
}

function countryCodesToFlagEmoji(iso2) {
  if (["tw"].includes(iso2.toLowerCase())) {
    iso2 = "cn";
  }
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside, true);
});

function handleClickOutside(event) {
  if (!event.target.closest(".dropdown-container")) {
    showDropdown.value = false;
  }
}
</script>
