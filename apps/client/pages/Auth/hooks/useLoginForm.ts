import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { type SignupFormValues } from "~/store/user";
export function useLoginForm() {
  const schema = yup.object({
    username: yup
      .string()
      .required("Please input your username")
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be less than 20 characters"),
    password: yup
      .string()
      .required("Please input your password")
      .min(6, "Password length must be greater than 6")
      .max(20, "Password must be no more than 20 characters")
      .matches(/^[^\u4e00-\u9fa5]*$/, "Password cannot contain Chinese characters"),
  });

  const { handleSubmit } = useForm<SignupFormValues>({
    validationSchema: schema,
  });

  const { value: phone, errorMessage: phoneError } = useField<string>("phone");
  const { value: username, errorMessage: usernameError } = useField<string>("username");
  const { value: password, errorMessage: passwordError } = useField<string>("password");

  return {
    handleSubmit,
    phone,
    phoneError,
    password,
    passwordError,
    username,
    usernameError,
  };
}
