import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  organizationName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  address?: string;

  @MinLength(6)
  password: string;
}
