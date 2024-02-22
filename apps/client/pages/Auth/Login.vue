<template>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="/logo.png" alt="earthworm" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
        Log in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-6" novalidate>
        <FormInput label="Phone" name="phone" type="tel" placeholder="Please enter your phone number" v-model="phone"
          :errorMessage="phoneError" />
        <FormInput label="Password" name="password" type="password" placeholder="Please enter your password"
          v-model="password" :errorMessage="passwordError" />
        <div class="pt-2">
          <button type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Log in
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not an account?
        <NuxtLink href="/auth/signup"
          className="font-semibold text-[1.2em] leading-6 text-fuchsia-500 hover:text-fuchsia-400">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from "~/pages/Auth/FormInput.vue";
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from "~/composables/auth";
import { useRouter, useRoute } from 'vue-router';
import { type SignupFormValues } from "~/store/user"

const schema = yup.object({
  phone: yup.string().required("Please input your phone number").matches(/^1[3456789]\d{9}$/, "Please input correct phone number"),
  password: yup.string().required("Please input your password").min(6, "Password length must be greater than 6"),
});

const { handleSubmit } = useForm<SignupFormValues>({
  validationSchema: schema,
});

const { value: phone, errorMessage: phoneError } = useField<string>('phone');
const { value: password, errorMessage: passwordError } = useField<string>('password');

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const handleLogin = handleSubmit(async (values) => {
  try {
    await login(values);
    router.replace(route.query.callback?.toString() || '/');
  } catch (error) {

  }
});
</script>