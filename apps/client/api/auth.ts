import { type ErrorVo, isError } from "./common";

interface SignInDto {
  phone: string;
  password: string;
}

interface SignUpDto extends SignInDto {
  name: string;
}

interface SignInVo {
  token: string;
}

export async function signin(dto: SignInDto) {
  const message = useMessage();
  const { data } = await useFetchPlus<SignInVo | ErrorVo>("/auth/signin", {
    body: dto,
    method: "post",
  });
  if (isError(data.value)) {
    message.error(data.value.message);
    return;
  }
  return data.value as SignInVo;
}

export async function signUp(dto: SignUpDto) {
  const message = useMessage();
  const { data } = await useFetchPlus<SignInVo | ErrorVo>("/auth/signup", {
    body: dto,
    method: "post",
  });
  if (isError(data.value)) {
    message.error(data.value.message);
    return;
  }
  return data.value as SignInVo;
}
