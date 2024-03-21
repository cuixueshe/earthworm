import { setToken } from "~/utils/token";
import { fetchLogin, fetchSignUp } from "~/api/auth";
import { useUserStore } from "~/store/user";

async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const userStore = useUserStore();

  const data = await fetchLogin({
    username,
    password,
  });

  setToken(data.token);
  userStore.initUser(data.user);
}

async function signup({
  username,
  nickname,
  password,
}: {
  username: string;
  nickname: string;
  password: string;
}) {
  const userStore = useUserStore();

  const data = await fetchSignUp({
    username,
    nickname,
    password,
  });

  setToken(data.token);
  userStore.initUser(data.user);
}

export function useAuth() {
  return {
    login,
    signup,
  };
}
