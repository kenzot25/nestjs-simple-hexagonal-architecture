import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/handler/create-user.handler';
import { DeleteUserHandler } from './application/handler/delete-user.handler';
import { GetUserHandler } from './application/handler/get-user.handler';
import { ListUsersHandler } from './application/handler/list-users.handler';
import { UpdateUserHandler } from './application/handler/update-user.handler';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUserUseCase } from './application/use-cases/list-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { InMemoryUserRepository } from './infrastructure/adapters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  imports: [CqrsModule],
  providers: [
    // Use cases
    CreateUserUseCase,
    GetUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    // Repository
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
    // Command handlers
    CreateUserHandler,
    DeleteUserHandler,
    UpdateUserHandler,
    // Query handlers
    GetUserHandler,
    ListUsersHandler,
  ],
  controllers: [UserController],
})
export class UserModule {}
