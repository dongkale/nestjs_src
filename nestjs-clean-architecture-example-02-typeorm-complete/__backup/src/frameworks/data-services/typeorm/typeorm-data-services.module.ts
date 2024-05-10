import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author, Book, Genre } from './model';
import { IDataServices } from '../../../core';
import { TypeOrmDataServices } from './typeorm-data-services.service';
// import { DATA_BASE_CONFIGURATION } from '../../../configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'test_02',
      // entities: [YourEntity],
      // synchronize: true,
    }),
    TypeOrmModule.forFeature([Author, Book, Genre]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: TypeOrmDataServices,
    },
  ],
  exports: [IDataServices],
})
export class TypeOrmDataServicesModule {}
