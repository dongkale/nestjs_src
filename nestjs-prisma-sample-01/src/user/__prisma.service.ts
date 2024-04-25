import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getPrismaInstance(): PrismaClient {
    return this.prisma;
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
