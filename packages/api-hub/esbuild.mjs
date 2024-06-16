import { cp } from "node:fs/promises";
import path from "node:path";

import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import glob from "tiny-glob";

/** esbuild plugin to copy static folder to outdir */
// function esbuildPluginFastifySwaggerUi(): Plugin {
//   return {
//     name: '@fastify/swagger-ui',
//     setup(build) {
//       const { outdir } = build.initialOptions
//       const fastifySwaggerUi = path.dirname(
//         require.resolve('@fastify/swagger-ui')
//       )
//       const source = path.join(fastifySwaggerUi, 'static')
//       const dest = path.join(outdir, 'static')

//       build.onEnd(async () => cp(source, dest, { recursive: true }))
//     }
//   }
// }

(async function () {
  const entryPoints = await glob("src/**/*.ts");

  build({
    entryPoints,
    logLevel: "info",
    outdir: "build",
    bundle: true,
    minify: true,
    platform: "node",
    format: "cjs",
    sourcemap: true,
    plugins: [
      esbuildPluginPino({ transports: ["pino-pretty"] }),
      //       esbuildPluginFastifySwaggerUi()
    ],
    alias: {
      "~": "./src",
    },
  });
})();
