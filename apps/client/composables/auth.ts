import { setToken } from "~/utils/token";
import { fetchLogin, fetchSignUp } from "~/api/auth";
import { useUserStore } from "~/store/user";

async function login({ phone, password }: { phone: string; password: string }) {
  const userStore = useUserStore();

  const data = await fetchLogin({
    phone,
    password,
  });

  setToken(data.token);
  userStore.initUser(data.user);
}

async function signup({
  phone,
  name,
  password,
}: {
  phone: string;
  name: string;
  password: string;
}) {
  const userStore = useUserStore();

  const data = await fetchSignUp({
    phone,
    name,
    password,
  });

  setToken(data.token);
  userStore.initUser(data.user);
}

export function useAuth() {
  return {
    login,
    signup
  };
}
