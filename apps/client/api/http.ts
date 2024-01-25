import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";

const isProd = process.env.NODE_ENV === "production";

export const http: AxiosInstance = axios.create({
  baseURL: isProd
    ? "http://earthworm.cuixueshe.com:81/api"
    : "http://localhost:3001",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// http.interceptors.request.use((config) => {
//   if (checkHaveToken()) config.headers.Authorization = `Bearer ${getToken()}`;

//   return config;
// });

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, statusText, data } = response;

    return data;
  },
  (error) => {
    // TODO 后面在统一处理
  }
);
