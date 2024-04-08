import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

async function main() {
  const client: ClientProxy = ClientProxyFactory.create({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
    },
  });

  const pattern = { cmd: 'add' };
  const data = [1, 2];

  const result = await client.send<number>(pattern, data).toPromise();
  console.log('Result:', result);
}

main();
