module.exports = {
  apps: [
    {
      name: "api-hub",
      script: "dist/index.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "prod",
        PORT: 3008,
      },
    },
  ],
};
