import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true })
  email: string;
}
