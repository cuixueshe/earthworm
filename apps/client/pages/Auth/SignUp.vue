<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto"
        src="/logo.png"
        alt="earthworm"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300"
      >
        Sign up to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        @submit.prevent="handleRegister"
        class="space-y-6"
        novalidate
      >
        <FormInput
          label="Name"
          name="name"
          placeholder="Your name"
          v-model="name"
          :errorMessage="nameError"
        />
        <CountryPhoneInput
          label="Phone"
          name="phone"
          v-model="phone"
          :errorMessage="phoneError"
          @update:country="updateCountryCode"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Your password"
          v-model="password"
          :errorMessage="passwordError"
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          v-model="confirmPassword"
          :errorMessage="confirmPasswordError"
        />
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="font-semibold text-[1.2em] leading-6 text-indigo-400 hover:text-indigo-500"
        >
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "~/composables/auth";
import { useSignupForm } from "~/pages/Auth/hooks/useSignUpForm";

import Message from "~/components/main/Message/useMessage";
import CountryPhoneInput from "~/pages/Auth/CountryPhoneInput.vue";
import FormInput from "~/pages/Auth/FormInput.vue";

const {
  handleSubmit,
  name,
  nameError,
  phone,
  phoneError,
  password,
  passwordError,
  confirmPassword,
  confirmPasswordError,
  updateCountryCode,
} = useSignupForm();

const router = useRouter();
const { signup } = useAuth();

const handleRegister = handleSubmit(async (values) => {
  //  countryCode :maybe backend api want to use it
  const [countryCode, purePhoneNumber] = values.phone.split("_");
  const modifiedValues = {
    ...values,
    phone: purePhoneNumber,
  };
  await signup(modifiedValues);
  Message.success("注册成功！");
  router.replace("/");
});
</script>
