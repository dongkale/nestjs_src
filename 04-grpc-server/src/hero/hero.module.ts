import { Module } from "@nestjs/common";
// import { ClientsModule } from "@nestjs/microservices";
// import { grpcClientOptions } from "../grpc-client.options";
import { HeroController } from "./hero.controller";

@Module({
  controllers: [HeroController],
})
export class HeroModule {}
