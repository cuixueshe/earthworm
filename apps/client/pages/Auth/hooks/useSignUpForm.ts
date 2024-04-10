import { PhoneNumberUtil } from "google-libphonenumber";
import { useField, useForm } from "vee-validate";
import { ref, type Ref } from "vue";
import * as yup from "yup";
import { type SignupFormValues } from "~/store/user";

const phoneUtil = PhoneNumberUtil.getInstance();
const countryRef: Ref<string> = ref("");
const phoneValidator = (phoneWithCode: string) => {
  if (!phoneWithCode) return false;
  const phoneNumberForValidation = phoneWithCode.replace("_", "");
  try {
    const number = phoneUtil.parse(phoneNumberForValidation, countryRef.value);
    return phoneUtil.isValidNumber(number);
  } catch (error) {
    return false;
  }
};

export function useSignupForm() {
  const schema = yup.object({
    name: yup
      .string()
      .required("请输入您的名字")
      .min(2, "名字最少包含 2 个字符")
      .max(20, "名字最多包含 20 个字符"),
    phone: yup
      .string()
      .required("请输入您的手机号码")
      .test("is-valid-phone", "请输入有效的手机号码", phoneValidator),
    password: yup
      .string()
      .required("请输入您的密码")
      .min(6, "密码最少包含 6 个字符")
      .max(20, "密码最多包含 20 个字符"),
    confirmPassword: yup
      .string()
      .required("请确认您的密码")
      .oneOf([yup.ref("password")], "两次密码不一致，请重新输入"),
  });

  const { handleSubmit } = useForm<SignupFormValues>({
    validationSchema: schema,
  });

  const updateCountryCode = (code: string) => {
    countryRef.value = code;
  };

  const { value: name, errorMessage: nameError } = useField<string>("name");
  const { value: phone, errorMessage: phoneError } = useField<string>("phone");
  const { value: password, errorMessage: passwordError } =
    useField<string>("password");
  const { value: confirmPassword, errorMessage: confirmPasswordError } =
    useField<string>("confirmPassword");

  return {
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
  };
}
