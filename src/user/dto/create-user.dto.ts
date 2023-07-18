import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Swagger Example

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.com',
    description:
      'Email used to create the user and define the person who is connected, can also be used for messaging services.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1234@abcD',
    description: 'Password responsible for user login.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
