import pino from "pino";

const isTestEnv = process.env.NODE_ENV === "test";
export const logger = pino({
  level: isTestEnv ? "silent" : "info",
  transport: {
    target: "pino-pretty",
  },
});
