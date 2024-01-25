import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { checkHaveToken, getToken } from "~/utils/token";

const isProd = process.env.NODE_ENV === "production";

export const http: AxiosInstance = axios.create({
  baseURL: isProd
    ? "http://earthworm.cuixueshe.com:81/api"
    : "http://localhost:3001",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  if (checkHaveToken()) config.headers.Authorization = `Bearer ${getToken()}`;

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data;

    if (code === 1) {
      return data;
    } else {
      console.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          console.error(error.message);
          break;
        case 401:
          // TODO 跳转到登录
          console.error(error.message, "跳转到登录")
          break;
      }
      return Promise.reject(error);
    }
  }
);
