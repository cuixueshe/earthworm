import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { ref, type Ref } from "vue";
import { PhoneNumberUtil } from "google-libphonenumber";
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
    username: yup
      .string()
      .required("Please enter your username")
      .min(2, "Username must be at least 2 characters")
      .max(20, "Username must be less than 20 characters"),
    nickname: yup
      .string()
      .required("Please enter your nickname")
      .min(2, "Nickname must be at least 2 characters")
      .max(20, "Nickname must be less than 20 characters"),
    // phone: yup
    //   .string()
    //   .required("Please enter your phone number")
    //   .test(
    //     "is-valid-phone",
    //     "Please enter a valid phone number",
    //     phoneValidator
    //   ),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const { handleSubmit } = useForm<SignupFormValues>({
    validationSchema: schema,
  });

  const updateCountryCode = (code: string) => {
    countryRef.value = code;
  };

  const { value: username, errorMessage: usernameError } =
    useField<string>("username");
  const { value: nickname, errorMessage: nicknameError } = useField<string>("nickname");
  const { value: phone, errorMessage: phoneError } = useField<string>("phone");
  const { value: password, errorMessage: passwordError } =
    useField<string>("password");
  const { value: confirmPassword, errorMessage: confirmPasswordError } =
    useField<string>("confirmPassword");

  return {
    handleSubmit,
    username,
    usernameError,
    nickname,
    nicknameError,
    phone,
    phoneError,
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    updateCountryCode,
  };
}
