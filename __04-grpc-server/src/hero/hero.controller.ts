import { Controller, Get, Inject, OnModuleInit, Param } from "@nestjs/common";
import {
  // ClientGrpc,
  GrpcMethod,
  // GrpcStreamMethod,
} from "@nestjs/microservices";
// import { Observable, ReplaySubject, Subject } from "rxjs";
// import { toArray } from "rxjs/operators";
import { HeroById } from "./interfaces/hero-by-id.interface";
import { Hero } from "./interfaces/hero.interface";
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";

@Controller()
export class HeroController {
  private readonly items: Hero[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ];

  @GrpcMethod("HeroesService", "findOne")
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ): Hero {
    return this.items.find(({ id }) => id === data.id);
  }
}
