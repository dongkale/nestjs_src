import { Logger, Module, Provider } from '@nestjs/common';
import { UserRepository } from '@/modules/user/database/user.repository';
import { CreateUserHttpController } from '@/modules/user/commands/create-user/create-user.http.controller';
import { DeleteUserHttpController } from '@/modules/user/commands/delete-user/delete-user.http-controller';
import { CreateUserCliController } from '@/modules/user/commands/create-user/create-user.cli.controller';
import { FindUsersHttpController } from '@/modules/user/queries/find-users/find-users.http.controller';
import { CreateUserMessageController } from '@/modules/user/commands/create-user/create-user.message.controller';
import { CreateUserService } from '@/modules/user/commands/create-user/create-user.service';
import { DeleteUserService } from '@/modules/user/commands/delete-user/delete-user.service';
import { FindUsersQueryHandler } from '@/modules/user/queries/find-users/find-users.query-handler';
import { UserMapper } from '@/modules/user/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from '@/modules/user/user.di-tokens';

const httpControllers = [
  CreateUserHttpController,
  DeleteUserHttpController,
  FindUsersHttpController,
];

const messageControllers = [CreateUserMessageController];

const cliControllers: Provider[] = [CreateUserCliController];

const commandHandlers: Provider[] = [CreateUserService, DeleteUserService];

const queryHandlers: Provider[] = [FindUsersQueryHandler];

const mappers: Provider[] = [UserMapper];

const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
];

@Module({
  imports: [CqrsModule],
  controllers: [...httpControllers, ...messageControllers],
  providers: [
    Logger,
    ...cliControllers,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
})
export class UserModule {}
