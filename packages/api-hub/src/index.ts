import "./utils/env";

import { join } from "path";

import autoLoad from "@fastify/autoload";
import Fastify from "fastify";

import { setupDb } from "./db";

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        destination: 1,
        colorize: true,
        translateTime: "HH:MM:ss.l",
        ignore: "pid,hostname",
      },
    },
  },
});

// fastify.register(autoLoad, {
//   dir: join(__dirname, "plugins"),
// });

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
});

const start = async () => {
  try {
    await setupDb();
    await fastify.listen({ port: 3008 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
