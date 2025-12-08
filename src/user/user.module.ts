import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUserUseCase } from './application/use-cases/list-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { InMemoryUserRepository } from './infrasctructure/adapters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';

@Module({
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    ListUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
