export const useFetchPlus: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  const token = localStorage.getItem("token")
  let headers: any = { ...opts?.headers }
  if (token) {
    headers['authorization'] = `Bear ${token}`
  }
  return useFetch(request, {
    baseURL: config.public.baseURL,
    headers,
    ...opts
  });
};
