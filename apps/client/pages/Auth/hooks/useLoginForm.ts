import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { type SignupFormValues } from "~/store/user";
export function useLoginForm() {
  const schema = yup.object({
    phone: yup
      .string()
      .required("请输入您的电话号码")
      .matches(/^\d{7,15}$/, "请输入有效的电话号码"),
    password: yup
      .string()
      .required("请输入您的密码")
      .min(6, "密码长度必须大于 6 个字符")
      .max(20, "密码不得超过 20 个字符")
      .matches(/^[^\u4e00-\u9fa5]*$/, "密码不能包含中文字符"),
  });

  const { handleSubmit } = useForm<SignupFormValues>({
    validationSchema: schema,
  });

  const { value: phone, errorMessage: phoneError } = useField<string>("phone");
  const { value: password, errorMessage: passwordError } =
    useField<string>("password");

  return {
    handleSubmit,
    phone,
    phoneError,
    password,
    passwordError,
  };
}
