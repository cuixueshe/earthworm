import { type ErrorVo, isError } from "./common";

interface LoginDto {
  phone: string;
  password: string;
}

interface SignUpDto extends LoginDto {
  name: string;
}

interface LoginVo {
  token: string;
}

export async function login(dto: LoginDto) {
  const message = useMessage();
  const { data } = await useFetchPlus<LoginVo | ErrorVo>("/auth/login", {
    body: dto,
    method: "post",
  });
  if (isError(data.value)) {
    message.error(data.value.message);
    return;
  }
  return data.value as LoginVo;
}

export async function signUp(dto: SignUpDto) {
  const message = useMessage();
  const { data } = await useFetchPlus<LoginVo | ErrorVo>("/auth/signup", {
    body: dto,
    method: "post",
  });
  if (isError(data.value)) {
    message.error(data.value.message);
    return;
  }
  return data.value as LoginVo;
}
