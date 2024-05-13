import { DynamicModule, Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Message } from 'src/infrastructure/entities/message.entity';
import { User } from 'src/infrastructure/entities/user.entity';

// export const databaseProviders = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async () => {
//       const sequelize = new Sequelize({
//         dialect: 'sqlite',
//         storage: 'database.sqlite',
//       });
//       sequelize.addModels([User, Message]);
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ];

// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}

// @Module({})
// export class DatabaseModule {
//   constructor(private sequelize: Sequelize) {
//     sequelize
//       .sync()
//       .then(() => {
//         console.log('데이터베이스 연결 성공');
//       })
//       .catch((e) => {
//         console.error(e);
//         console.log('데이터베이스 연결 실패');
//       });
//   }

//   static forRoot(): DynamicModule {
//     const sequelizeModule: DynamicModule = SequelizeModule.forRootAsync({
//       useFactory: (configService: ConfigService) => ({
//         dialect: 'mysql',
//         host: configService.get<string>('DATABASE_HOST'), // 설정에서 host 가져오기
//         port: configService.get<number>('DATABASE_PORT'), // 설정에서 port 가져오기
//         username: configService.get<string>('DATABASE_USERNAME'), // 설정에서 username 가져오기
//         password: configService.get<string>('DATABASE_PASSWORD'), // 설정에서 password 가져오기
//         database: configService.get<string>('DATABASE_NAME'), // 설정에서 database 이름 가져오기
//         models: [User, Webtoon, UserWebtoon],
//         synchronize: true,
//       }),
//       inject: [ConfigService],
//     });

//     return {
//       module: MysqlSequelizeModule,
//       imports: [sequelizeModule],
//       exports: [sequelizeModule],
//     };
//   }
// }

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      sequelize.addModels([User, Message]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
