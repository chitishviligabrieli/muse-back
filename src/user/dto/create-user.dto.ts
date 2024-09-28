import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Match } from '../../auth/decorators/match.decorator';
import { RolesEnum } from '../../auth/role/role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })  // Add custom validation here
  confirmPassword: string;

  @IsOptional()
  @IsEnum(RolesEnum, { message: 'Role must be either admin or user'})
  role?: RolesEnum;

  @IsOptional()
  @IsBoolean()
  blocked: boolean;
}
