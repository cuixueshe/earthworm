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
        Log in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
        novalidate
      >
        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Please enter your phone number"
          v-model="phone"
          :errorMessage="phoneError"
          :onlyNumbers="true"
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Please enter your password"
          v-model="password"
          :errorMessage="passwordError"
        />
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        Not an account?
        <NuxtLink
          href="/auth/signup"
          class="font-semibold text-[1.2em] leading-6 text-indigo-400 hover:text-indigo-500"
        >
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import Message from "~/components/main/Message/useMessage";
import { useAuth } from "~/composables/auth";
import FormInput from "~/pages/Auth/FormInput.vue";
import { useLoginForm } from "~/pages/Auth/hooks/useLoginForm";
const { handleSubmit, phone, phoneError, password, passwordError } =
  useLoginForm();

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const handleLogin = handleSubmit(async (values) => {
  await login(values);
  Message.success("login success!");
  router.replace(route.query.callback?.toString() || "/");
});
</script>
