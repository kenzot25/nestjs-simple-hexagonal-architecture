import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../commands/update-user.command';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { User } from '../../domain/entities/user.entity';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    return this.updateUserUseCase.execute(command.id, {
      name: command.name,
      email: command.email,
    });
  }
}
