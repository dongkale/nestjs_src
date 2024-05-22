export interface ServerConfig {
  port: 3000;
}

export default () => ({
  server: {
    port: parseInt(process.env.SERVER_PORT ?? '3000', 10),
  },
});
