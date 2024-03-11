<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="/logo.png" alt="earthworm" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form @submit.prevent="handleRegister" class="space-y-6" novalidate>
        <FormInput label="Name" name="name" placeholder="Your name" v-model="name" :errorMessage="nameError" />
        <CountryPhoneInput label="Phone" name="phone" v-model="phone" :errorMessage="phoneError"
          @update:country="updateCountryCode" />
        <FormInput label="Password" name="password" type="password" placeholder="Your password" v-model="password"
          :errorMessage="passwordError" />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password"
          v-model="confirmPassword" :errorMessage="confirmPasswordError" />
        <div class="pt-2">
          <button type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign up
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from "~/pages/Auth/FormInput.vue";
import CountryPhoneInput from "~/pages/Auth/CountryPhoneInput.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import {
  type CountryCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { useAuth } from "~/composables/auth";
import { useRouter } from "vue-router";
import { type SignupFormValues } from "~/store/user";
import { ref } from "vue";

const countryRef = ref("");
function updateCountryCode(code: string) {
  countryRef.value = code;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Please enter your name")
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must be less than 20 characters"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .test("is-valid-phone", "Please enter a valid phone number", (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(
        value,
        countryRef.value as CountryCode
      );
      return phoneNumber ? phoneNumber.isValid() : false;
    }),

  password: yup
    .string()
    .required("Please enter your password")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const { handleSubmit } = useForm<SignupFormValues>({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const {
  value: phone,
  errorMessage: phoneError,
  setValue: setPhoneValue,
} = useField<string>("phone");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: confirmPassword, errorMessage: confirmPasswordError } =
  useField<string>("confirmPassword");

const router = useRouter();
const { signup } = useAuth();

const handleRegister = handleSubmit(async (values) => {

  const formattedPhone = values.phone.replace(/[^\d]/g, "");
  const modifiedValues = {
    ...values,
    phone: formattedPhone,
  };

  try {
    await signup(modifiedValues);
    router.replace("/");
  } catch (error) {
  }
});
</script>