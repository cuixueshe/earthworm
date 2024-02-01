<template>
  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="/logo.png" alt="earthworm" />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <n-form ref="formEl" :rules="rules" :model="model">
        <n-form-item path="name" label="Name" required>
          <n-input v-model:value="model.name" @keydown.enter.prevent @keyup.enter="handleRegister" />
        </n-form-item>
        <n-form-item path="phone" label="Phone" required>
          <n-input v-model:value="model.phone" @keydown.enter.prevent @keyup.enter="handleRegister" />

        </n-form-item>
        <n-form-item path="password" label="Password" required>
          <n-input v-model:value="model.password" type="password" @keydown.enter.prevent @keyup.enter="handleRegister" />
        </n-form-item>
        <n-form-item path="confirmPassword" label="ConfirmPassword" required>
          <n-input v-model:value="model.confirmPassword" type="password" @keydown.enter.prevent
            @keyup.enter="handleRegister" />
        </n-form-item>
        <n-button type="primary" size="large" block @click="handleRegister">
          Sign in
        </n-button>
      </n-form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Has a account?
        <NuxtLink href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type FormInst, type FormRules, type FormItemRule } from "naive-ui";
import { useAuth } from "~/composables/auth";

interface ModelType {
  name: string | null;
  phone: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const { signup } = useAuth();
const formEl = ref<FormInst | null>(null);

const model = ref<ModelType>({
  name: null,
  phone: null,
  password: null,
  confirmPassword: null,
});

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model.value.password;
}

const rules: FormRules = {
  name: [
    { required: true, message: "Please input you name" },
    { min: 2, max: 20, message: "name length must be min 2 and max 20" },
  ],
  phone: [
    { required: true, message: "Please input your phone number" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "Please input correct phone number",
    },
  ],
  password: [
    { required: true, message: "Please input your password" },
    { min: 6, max: 20, message: "Password length must be greater than 6" },
  ],
  confirmPassword: [
    { required: true, message: "Please input confirmPassword" },
    {
      validator: validatePasswordSame,
      message: "The two password inputs are inconsistent",
    },
  ],
};

const message = useMessage();
const router = useRouter();

const handleRegister = () => {
  formEl.value?.validate(async (errors) => {
    if (!errors) {
      await signup({
        phone: model.value.phone ?? "",
        name: model.value.name ?? "",
        password: model.value.password ?? "",
      });

      message.success("register success", {
        duration: 500,
        onLeave() {
          router.replace("/");
        },
      });
    }
  });
};
</script>
