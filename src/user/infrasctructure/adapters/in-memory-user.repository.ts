import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/user/application/ports/user.repository.port';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private users: Map<string, User> = new Map();

  save(user: User): User {
    this.users.set(user.getId().getValue(), user);
    return user;
  }

  findById(id: string) {
    return this.users.get(id) || null;
  }

  findByEmail(email: string): User | null {
    const users = Array.from(this.users.values());
    return users.find((user) => user.getEmail().getValue() === email) || null;
  }

  findAll(): Promise<User[]> | User[] {
    return Array.from(this.users.values());
  }

  delete(id: string): Promise<void> | void {
    this.users.delete(id);
  }
}
