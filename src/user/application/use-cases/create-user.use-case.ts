import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';
import { CreateUserDto } from 'src/user/presentation/dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new Error('User with this email already exists.');
    }
    console.log('dto', dto);
    const user = User.create(dto.name, dto.email);

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
