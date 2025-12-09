import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  @IsString()
  @IsEmail()
  email: string;
}
