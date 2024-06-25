import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(24)
  username: string;

  @IsString()
  @MinLength(5)
  @MaxLength(46)
  userPassword: string;
}
