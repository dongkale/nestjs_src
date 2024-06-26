import { DynamicModule, Module } from '@nestjs/common';
import { CreateUserUseCases } from '@/applications/use-cases/createUser.usecase';
import { GetAllUserUseCases } from '@/applications/use-cases/getAllUsers.usecase';
import { EnvironmentConfigModule } from '@/infrastructures/config/environment-config/environment-config.module';
import { RepositoriesModule } from '@/infrastructures/repositories/repositories.module';
import { UserRepositoryOrm } from '@/infrastructures/repositories/user.repository';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule],
})
export class UsecaseProxyModule {
  static GET_ALL_USERS_USE_CASE = 'getAllUsersUsecaseProxy';
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new GetAllUserUseCases(userRepository)),
        },
        {
          inject: [UserRepositoryOrm],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryOrm) =>
            new UseCaseProxy(new CreateUserUseCases(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_ALL_USERS_USE_CASE,
        UsecaseProxyModule.CREATE_USER_USE_CASE,
      ],
    };
  }
}
