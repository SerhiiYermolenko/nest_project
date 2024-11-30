import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserManagementDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
