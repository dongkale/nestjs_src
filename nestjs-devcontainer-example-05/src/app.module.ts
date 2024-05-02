import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SampleModule } from './sample/sample.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '52.79.52.203',
      port: 3306,
      username: 'lennon',
      password: 'lennon0108!',
      database: 'test',
      entities: [],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
