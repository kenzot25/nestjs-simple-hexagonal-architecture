import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ListUsersQuery } from '../queries/list-users.query';
import { ListUserUseCase } from '../use-cases/list-user.use-case';
import { User } from '../../domain/entities/user.entity';

@QueryHandler(ListUsersQuery)
export class ListUsersHandler implements IQueryHandler<ListUsersQuery> {
  constructor(private readonly listUserUseCase: ListUserUseCase) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: ListUsersQuery): Promise<User[]> {
    return this.listUserUseCase.execute();
  }
}
