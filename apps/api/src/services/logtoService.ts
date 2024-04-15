import axios from 'axios';

const clientId = process.env.LOGTO_CLIENT_ID;
const clientSecret = process.env.LOGTO_CLIENT_SECRET;
const LOGTO_ENDPOINT = process.env.LOGTO_ENDPOINT;

const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  'base64',
);

// 创建 Axios 实例
const basicAxios = axios.create({
  baseURL: LOGTO_ENDPOINT,
  timeout: 1000,
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export async function fetchToken() {
  const res = await basicAxios.post('/oidc/token', {
    grant_type: 'client_credentials',
    resource: process.env.LOGTO_M2M_API,
    scope: 'all',
  });

  return res.data.access_token;
}

export const logtoApi = axios.create({
  baseURL: LOGTO_ENDPOINT,
  timeout: 1000,
});

logtoApi.interceptors.request.use(async (config) => {
  const token = await fetchToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
