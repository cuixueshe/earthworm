import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { type SignupFormValues } from "~/store/user";
export function useLoginForm() {
  const schema = yup.object({
    phone: yup
      .string()
      .required("Please input your phone number")
      .matches(/^\d{7,15}$/, "Please input a valid phone number"),
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
  const { value: password, errorMessage: passwordError } = useField<string>("password");

  return {
    handleSubmit,
    phone,
    phoneError,
    password,
    passwordError,
  };
}
