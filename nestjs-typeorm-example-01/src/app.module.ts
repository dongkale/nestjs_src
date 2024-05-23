import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user';

const databaseConfig = CONFIG.get('database');
const typeOrmConfig = Object.assign(databaseConfig, {
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
