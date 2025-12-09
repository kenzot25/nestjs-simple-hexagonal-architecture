import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'User name' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    example: 'jane@example.com',
    description: 'User email',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
