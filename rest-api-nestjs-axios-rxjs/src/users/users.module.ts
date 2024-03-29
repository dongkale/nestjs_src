import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  exports: [HttpModule],
  providers: [UsersService],
})
export class UsersModule {}
