import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserManagementDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
