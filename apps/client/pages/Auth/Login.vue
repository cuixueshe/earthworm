<template>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="/logo.png" alt="earthworm" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <n-form ref="formRef" :rules="rules" :model="model">
                <n-form-item path="phone" label="Phone" required>
                    <n-input v-model:value="model.phone" @keydown.enter.prevent />
                </n-form-item>
                <n-form-item path="password" label="Password" required>
                    <n-input v-model:value="model.password" type="password" @keydown.enter.prevent />
                </n-form-item>
                <n-button type="primary" size="large" block @click="handleLogin">
                    Sign in
                </n-button>
            </n-form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not a account?
                <NuxtLink href="/auth/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign up
                </NuxtLink>
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type FormInst, type FormRules } from 'naive-ui'
import { login } from '../../api/auth'
const formRef = ref<FormInst | null>(null)

interface ModelType {
    phone: string | null
    password: string | null
}

const model = ref<ModelType>({
    phone: null,
    password: null
})

const rules: FormRules = {
    phone: [
        { required: true, message: 'Please input your phone number' },
        { pattern: /^1[3456789]\d{9}$/, message: 'Please input correct phone number' }
    ],
    password: [
        { required: true, message: 'Please input your password' },
        { min: 6, message: 'Password length must be greater than 6' }
    ]
}

const message = useMessage()
const router = useRouter()

const handleLogin = () => {
    formRef.value?.validate(async errors => {
        if (!errors) {
            const data = await login({
                phone: model.value.phone ?? '',
                password: model.value.password ?? ''
            })
            if (data) {
                localStorage.setItem('token', data.token)
                message.success('login success')
                setTimeout(() => {
                    router.replace('/')
                }, 500)
            }
        }
    })
}
</script>
