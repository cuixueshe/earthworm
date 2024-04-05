import { PhoneNumberUtil } from "google-libphonenumber";
import { useField, useForm } from "vee-validate";
import { ref, type Ref } from "vue";
import * as yup from "yup";

interface AchievementFormValues {
  phone: string;
  secretKey: string;
}

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

export function useAwardForm() {
  const schema = yup.object({
    phone: yup.string().required("请输入用户手机号").test(
      "is-valid-phone",
      "请输入正确的手机号",
      phoneValidator
    ),
    secretKey: yup.string().required("请输入授权指令"),
  });

  const { handleSubmit, resetForm } = useForm<AchievementFormValues>({
    validationSchema: schema,
  });

  const updateCountryCode = (code: string) => {
    countryRef.value = code;
  };

  const { value: phone, errorMessage: phoneError } = useField<string>("phone");
  const { value: secretKey, errorMessage: secretKeyError } =
    useField<string>("secretKey");

  return {
    handleSubmit,
    secretKey,
    secretKeyError,
    phone,
    phoneError,
    resetForm,
    updateCountryCode,
  };
}
