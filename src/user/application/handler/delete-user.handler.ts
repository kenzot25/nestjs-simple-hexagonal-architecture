import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    return this.deleteUserUseCase.execute(command.id);
  }
}
