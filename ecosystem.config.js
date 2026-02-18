module.exports = {
  apps: [
    {
      name: "alpha-site",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
