import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/domain/entities/user.entity';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ example: 5, description: 'Account age in days' })
  accountAge: number;

  static fromDomain(user: User): UserResponseDto {
    return {
      id: user.getId().getValue(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      createdAt: user.getCreateAt(),
      updatedAt: user.getUpdateAt(),
      accountAge: user.getAccountAge(),
    };
  }
}
