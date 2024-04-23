module.exports = {
  apps: [
    {
      name: 'data_smith_api',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      error_file: './logs/pm2/error.log',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
