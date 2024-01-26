import { http } from "./http";

interface LoginDto {
  phone: string;
  password: string;
}

export interface UserInfo {
  userId: string;
  username: string;
  phone: string;
}

interface SignUpDto extends LoginDto {
  name: string;
}

interface LoginVo {
  token: string;
  user: UserInfo;
}

export async function login(dto: LoginDto) {
  return await http.post<LoginVo, LoginVo>("/auth/login", dto);
}

export async function signUp(dto: SignUpDto) {
  return await http.post<LoginVo, LoginVo>("/auth/signup", dto);
}
