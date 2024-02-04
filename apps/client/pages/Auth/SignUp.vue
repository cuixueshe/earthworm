<template>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="/logo.png" alt="earthworm" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
        Sign up to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="handleRegister" class="space-y-6" novalidate>
        <div>
          <label for="name" class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Name <span
              class="text-red-500">*</span></label>
          <input v-model="name" id="name" name="name" type="text" required placeholder="Your name"
            class="mt-2 appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-600"
            autocomplete="off">
          <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">{{ errors.name }}</p>
        </div>
        <div>
          <label for="phone" class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Phone <span
              class="text-red-500">*</span></label>
          <input v-model="phone" id="phone" name="phone" type="tel" required placeholder="Your phone number"
            class="mt-2 appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-600"
            autocomplete="off">
          <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">{{ errors.phone }}</p>
        </div>
        <div>
          <label for="password" class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password <span
              class="text-red-500">*</span></label>
          <input v-model="password" id="password" name="password" type="password" required placeholder="Your password"
            class="mt-2 appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-600"
            autocomplete="off">
          <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">{{ errors.password }}</p>
        </div>
        <div>
          <label for="confirmPassword" class="block mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm
            Password <span class="text-red-500">*</span></label>
          <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password" required
            placeholder="Confirm your password"
            class="mt-2 appearance-none block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-sm text-gray-700 dark:text-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-600 dark:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-600"
            autocomplete="off">
          <p class="text-red-500 text-opacity-80 text-xs h-1 m-1">{{ errors.confirmPassword }}</p>
        </div>
        <div class="pt-2">
          <button type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign up
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        Has an account?
        <NuxtLink href="/auth/login"
          className="font-semibold text-[1.2em] leading-6 text-fuchsia-500 hover:text-fuchsia-400">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from "~/composables/auth";
import { useRouter } from 'vue-router';

const schema = yup.object({
  name: yup.string().required("Please enter your name").min(2, "Name must be at least 2 characters").max(20, "Name must be less than 20 characters"),
  phone: yup.string().required("Please enter your phone number").matches(/^1[3456789]\d{9}$/, "Please enter a valid phone number"),
  password: yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password')], "Passwords must match"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: name } = useField('name');
const { value: phone } = useField('phone');
const { value: password } = useField('password');
const { value: confirmPassword } = useField('confirmPassword');

const router = useRouter();
const { signup } = useAuth();

const handleRegister = handleSubmit(async (values) => {
  try {
    const signupValues = {
      phone: values.phone as string,
      name: values.name as string,
      password: values.password as string,
    };
    await signup(signupValues);
    router.replace("/");
  } catch (error) {
    
  }
});

</script>


