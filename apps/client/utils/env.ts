export function isProd() {
  return true;
  return process.env.NODE_ENV === "production";
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}
