import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { User } from '../../domain/entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(command: CreateUserCommand): Promise<User> {
    return this.createUserUseCase.execute({
      name: command.name,
      email: command.email,
    });
  }
}
