// import { ReflectionService } from "@grpc/reflection";
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['hello', 'bye'],
    protoPath: ['../proto/hello.proto', '../proto/bye.proto'],
  },
};
