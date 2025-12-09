import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from 'src/user/domain/entities/user.entity';
import { GetUserQuery } from '../queries/get-user.query';
import { GetUserUseCase } from '../use-cases/get-user.use-case';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements ICommandHandler<GetUserQuery> {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.getUserUseCase.execute(query.id);
  }
}
