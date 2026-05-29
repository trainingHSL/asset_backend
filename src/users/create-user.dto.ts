import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../common/enums/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  employeeCode: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  department?: string;

  @IsOptional()
  designation?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
