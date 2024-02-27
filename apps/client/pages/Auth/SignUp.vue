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
        <FormInput label="Name" name="name" placeholder="Your name" v-model="name" :errorMessage="nameError" />
        <FormInput label="Phone" name="phone" type="tel" placeholder="Your phone number" v-model="phone"
          :errorMessage="phoneError" />
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
import FormInput from "~/pages/Auth/FormInput.vue";
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useAuth } from "~/composables/auth";
import { useRouter } from 'vue-router';
import { type SignupFormValues } from "~/store/user"

const schema = yup.object({
  name: yup.string().required("Please enter your name").min(2, "Name must be at least 2 characters").max(20, "Name must be less than 20 characters"),
  phone: yup.string().required("Please enter your phone number").matches(/^1[3456789]\d{9}$/, "Please enter a valid phone number"),
  password: yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters"),
  confirmPassword: yup.string().required("Please confirm your password").oneOf([yup.ref('password')], "Passwords must match"),
});

const { handleSubmit } = useForm<SignupFormValues>({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField<string>('name');
const { value: phone, errorMessage: phoneError } = useField<string>('phone');
const { value: password, errorMessage: passwordError } = useField<string>('password');
const { value: confirmPassword, errorMessage: confirmPasswordError } = useField<string>('confirmPassword');


const router = useRouter();
const { signup } = useAuth();

const handleRegister = handleSubmit(async (values) => {
  await signup(values);
  router.replace("/");
});

</script>
