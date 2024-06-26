import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { grpcClientOptions } from "../grpc-client.options";
import { HeroClientController } from "./hero.client.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "HERO_PACKAGE",
        ...grpcClientOptions,
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule {}
