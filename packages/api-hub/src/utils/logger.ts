import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});
