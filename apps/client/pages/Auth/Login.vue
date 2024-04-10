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
        欢迎登录
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
        novalidate
      >
        <FormInput
          label="手机号码"
          name="phone"
          type="tel"
          placeholder="请输入你的手机号码"
          v-model="phone"
          :errorMessage="phoneError"
          :onlyNumbers="true"
        />
        <FormInput
          label="密码"
          name="password"
          type="password"
          placeholder="请输入你的密码"
          v-model="password"
          :errorMessage="passwordError"
        />
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            登录
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500">
        还没有账户?
        <NuxtLink
          href="/auth/signup"
          class="font-semibold text-[1.2em] leading-6 text-indigo-400 hover:text-indigo-500"
        >
          注册
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
