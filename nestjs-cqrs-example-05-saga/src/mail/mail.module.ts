/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MailHandler } from './mail.handler';

@Module({
  imports: [],
  controllers: [],
  providers: [MailHandler],
})
export class MailModule {}
