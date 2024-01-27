import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import { checkHaveToken, getToken } from "~/utils/token";
import { isProd } from "~/utils/env";

interface Response<T extends Record<PropertyKey, unknown>> {
  code: number;
  message: string;
  data: T | null;
}

export const http: AxiosInstance = axios.create({
  baseURL: isProd()
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
  (response: AxiosResponse<Response<any>>) => {
    const { code, message, data } = response.data;
    if (code === 1) {
      return data;
    } else {
      apiCodeErrorHandler?.(message)
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    if (error.response.status) {
      httpStatusErrorHandler?.(error.message, error.response.status);
      return Promise.reject(error);
    }
  }
);


type ApiCodeErrorHandler = (message: string) => void;
let apiCodeErrorHandler: ApiCodeErrorHandler;
export function injectApiCodeErrorHandler(handler: ApiCodeErrorHandler) {
  apiCodeErrorHandler = handler;
}

type HttpStatusErrorHandler = (message: string, statusCode: number) => void;
let httpStatusErrorHandler: HttpStatusErrorHandler
export function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler
}
