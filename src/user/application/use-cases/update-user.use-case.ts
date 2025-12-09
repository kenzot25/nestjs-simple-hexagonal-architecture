import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';
import { UpdateUserDto } from 'src/user/presentation/dtos/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (dto.name) {
      user.updateName(dto.name);
    }

    if (dto.email) {
      user.updateEmail(dto.email);
    }

    return this.userRepository.save(user);
  }
}
