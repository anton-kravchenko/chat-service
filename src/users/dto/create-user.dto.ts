import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @MinLength(4)
  @MaxLength(10)
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty({ required: true })
  password: string;
}
