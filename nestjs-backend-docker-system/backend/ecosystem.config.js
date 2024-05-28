module.exports = {
  apps : [{
    name   : "min-research-backend",
    script : "dist/main.js",
    instances: "2",
    exec_mode: "cluster",
    listen_timeout: 50000,
    wait_ready: true,
    kill_timeout: 5000,
    error_file:"./logs/pm2/error.log",
    // ignore_watch:["node_modules","*.git","*.log","log","tmp"],
    env: {
      NODE_ENV: "development"
    },
    env_production : {
      NODE_ENV: "production"
    }
  }]
}
// {
//   "name": "min-research-backend",
//   "script": "dist/main.js",
//   "instances": "2",
//   "exec_mode": "cluster",
//   "listen_timeout": 50000,
//   "wait_ready": true,
//   "kill_timeout": 5000,
//   "error_file":"./logs/pm2/error.log",
//   "env_development": {
//     "NODE_ENV": "development"
//   },
//   "env_production" : {
//     "NODE_ENV": "production"
//   }
// }