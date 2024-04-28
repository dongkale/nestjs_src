import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
// import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  users() {
    return this.prisma.user.findMany();
  }

  // user(userId: string) {
  //   return this.prisma.user.findFirstOrThrow({
  //     where: { id: userId },
  //   });
  // }

  // async findUserById(id: number) {
  //   return this.prisma.findUserById(id);
  // }
}
