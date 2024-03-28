import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '@/app.roles';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from '@/config';
import * as TypeOrmConfig from './ormconfig'
import { UserModule } from '@user/user.module';
import { HomeModule } from '@home/home.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(TypeOrmConfig.default),
        AccessControlModule.forRoles(roles),
        MailerModule.forRoot(mailerConfig),
        UserModule,
        HomeModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
