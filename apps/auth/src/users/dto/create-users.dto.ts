import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUsersDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
