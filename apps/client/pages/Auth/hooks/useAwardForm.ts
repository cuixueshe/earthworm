import { useField, useForm } from "vee-validate";
import * as yup from "yup";

interface AchievementFormValues {
  phone: string;
  secretKey: string;
}

// TODO optimize phoneValidator
const phoneValidator = (phoneWithCode: string) => {
  if (!phoneWithCode || phoneWithCode.length > 11) return false;
  else return true;
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
  };
}
