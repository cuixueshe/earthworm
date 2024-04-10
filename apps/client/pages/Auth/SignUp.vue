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
        注册您的账户
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        @submit.prevent="handleRegister"
        class="space-y-6"
        novalidate
      >
        <FormInput
          label="名字"
          name="name"
          placeholder="请输入您的名字"
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
          label="密码"
          name="password"
          type="password"
          placeholder="请输入您的密码"
          v-model="password"
          :errorMessage="passwordError"
        />
        <FormInput
          label="确认密码"
          name="confirmPassword"
          type="password"
          placeholder="请再次输入您的密码"
          v-model="confirmPassword"
          :errorMessage="confirmPasswordError"
        />
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            注册
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        已经有账户了?
        <NuxtLink
          to="/auth/login"
          class="font-semibold text-[1.2em] leading-6 text-indigo-400 hover:text-indigo-500"
        >
          登录
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  import Message from "~/components/main/Message/useMessage";
  import { useAuth } from "~/composables/auth";
  import CountryPhoneInput from "~/pages/Auth/CountryPhoneInput.vue";
  import FormInput from "~/pages/Auth/FormInput.vue";
  import { useSignupForm } from "~/pages/Auth/hooks/useSignUpForm";
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
    Message.success("register success!");
    router.replace("/");
  });
</script>
