import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import {
  ClientGrpc,
  GrpcMethod,
  GrpcStreamMethod,
} from "@nestjs/microservices";

@Injectable()
export class HeroClientService implements OnModuleInit {
  private heroeService: HeroesService;
  constructor(@Inject("HERO_PACKAGE") private readonly client: ClientGrpc) {}

  onModuleInit(): any {
    this.heroesService = this.client.getService<HeroesService>("HeroesService");
  }
}
